import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  VoiceConnection
} from '@discordjs/voice';
import {
  TextBasedChannel,
  User,
  VoiceBasedChannel,
  Client,
  CommandInteraction,
  SlashCommandBuilder,
  EmbedField
} from 'discord.js';
import ytdl from 'ytdl-core';
import { createEmbed } from '../../util/embeds';
// Rembember to add the export for this command to commands/index.ts

export type Song = {
  requestedBy: User;
  title: string;
  url: string;
  duration: string | null;
  thumbnail: string | null;
};

export type QueueEntry = {
  voice_channel: VoiceBasedChannel;
  text_channel: TextBasedChannel;
  connection: VoiceConnection | null;
  songs: Song[];
};

export let queue = new Map<string, QueueEntry>();
const audioPlayer = createAudioPlayer();

export const player = async (guild: string) => {
  let song_queue = queue.get(guild);

  if (!song_queue) {
    queue.delete(guild);
    return;
  }

  const getNextResource = () => {
    song_queue = queue.get(guild) ? queue.get(guild) : song_queue; // Refetch the queue in case a shuffle has happened
    if (!song_queue) {
      queue.delete(guild);
      return;
    }

    if (song_queue && !song_queue.songs.length) {
      song_queue.connection?.destroy();
      queue.delete(guild);
      return;
    } else {
      play();
    }
  };

  const play = async () => {
    const song = song_queue!.songs[0]; // Always pick from the first song
    const stream = ytdl(song?.url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    });
    const resource = createAudioResource(stream);
    audioPlayer.play(resource);
    song_queue!.connection?.subscribe(audioPlayer);
  };

  audioPlayer.on(AudioPlayerStatus.Idle, () => {
    if (song_queue) {
      song_queue?.songs.shift();
    }
    getNextResource();
  });

  audioPlayer.on('error', (error) => {
    console.error(error);
  });

  getNextResource();
};

export const forceExit = async (guild: string) => {
  const song_queue: QueueEntry | undefined = queue.get(guild);

  song_queue?.connection?.destroy();
  queue.delete(guild);
};

export const skip = async () => {
  audioPlayer.stop();
};

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`queue`)
  .setDescription(`Show what is currently in 白月 Shiratsuki's music queue`)
  .addNumberOption((number) =>
    number
      .setName(`amount`)
      .setDescription(`How many entries in the queue to show (1 - 10)`)
      .setMinValue(1)
      .setMaxValue(10)
      .setRequired(false)
  );
export const global = true;

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  if (!interaction.channel) {
    return;
  }
  const guild = client.guilds.cache.get(interaction.guild?.id || '');
  if (!guild) {
    return interaction.reply(`I couldn't find the server.`);
  }

  const song_queue = queue.get(guild.id);
  if (!song_queue) {
    return interaction.reply(`This server currently doesn't have a queue!`);
  }

  const amountToDisplay =
    (interaction.options.get('amount')?.value as number) || 5; // Default to 5 entries
  const songs = song_queue.songs;

  if (!songs.length) {
    return interaction.reply(`This server has a queue but no songs!`);
  } else if (songs.length === 1) {
    return interaction.reply({
      embeds: [
        createEmbed({
          title: `Music Queue: (**${songs.length}** song) 🎵`,
          description: `Currently Playing **${songs[0]?.title}**! This is the last song in the queue.`,
          thumbnailUrl: songs[0]?.thumbnail || '',
          url: songs[0]?.url,
          color: `#87b5ff`,
          footer: {
            text: `白月 - Shiratsuki - Music Controller V3`
          }
        })
      ]
    });
  } else {
    const queueFields: EmbedField[] = [];
    for (let i = 1; i <= amountToDisplay && i < songs.length; i++) {
      queueFields.push({
        name: `${i === 1 ? 'Next:' : i + '#'} ${songs[i].title}`,
        value: `Requested by ${songs[i].requestedBy} ~ [(${songs[i].duration}) - View on Youtube](${songs[i].url})`,
        inline: false
      });
    }

    return interaction.reply({
      embeds: [
        createEmbed({
          title: `Music Queue: (**${songs.length}** songs) 🎵`,
          description: `Currently Playing **[${songs[0].title}](${songs[0].url})**!`,
          thumbnailUrl: songs[0]?.thumbnail || '',
          url: songs[0]?.url,
          color: `#87b5ff`,
          fields: queueFields,
          footer: {
            text: `白月 - Shiratsuki - Music Controller V3`
          }
        })
      ]
    });
  }
};
