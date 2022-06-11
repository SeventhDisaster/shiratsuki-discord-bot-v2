import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { queue, QueueEntry, Song } from './queue';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`shuffle`)
  .setDescription(
    `Randomizes the order of the songs currently in 白月 Shiratsuki's queue!`
  );
export const global = true;

const shuffleSongs = (songs: Song[]): Song[] => {
  for (let i = songs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = songs[i];
    songs[i] = songs[j];
    songs[j] = temp;
  }
  return songs;
};

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

  const queue_entry = queue.get(guild.id);
  if (!queue_entry) {
    return interaction.reply(`This server currently doesn't have a queue!`);
  }

  if (queue_entry.songs.length < 3) {
    return interaction.reply(
      `This server's queue is too short to shuffle! (Minimum 3 songs requried)`
    );
  }

  // Shuffle Algorithm
  const shuffled_queue: Song[] = [...shuffleSongs(queue_entry.songs.slice(1))];

  // Set updated shuffled list
  const updatedEntry: QueueEntry = {
    voice_channel: queue_entry.voice_channel,
    text_channel: queue_entry.text_channel,
    connection: queue_entry.connection,
    songs: shuffled_queue
  };
  queue.set(guild.id, updatedEntry);

  return interaction.reply(`Songs in the queue have been shuffled! 🔀`);
};
