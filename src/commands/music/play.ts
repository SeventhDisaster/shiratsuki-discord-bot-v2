import { SlashCommandBuilder } from '@discordjs/builders';
import { joinVoiceChannel } from '@discordjs/voice';
import { Client, CommandInteraction } from 'discord.js';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import { createEmbed } from '../../util/embeds';
import { player, queue, QueueEntry, Song } from './queue';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`play`)
  .setDescription(
    `Play or queue the audio from a youtube video or queue a playlist in your voice channel.`
  )
  .addStringOption((option) =>
    option
      .setName('url')
      .setDescription('The video / playlist url')
      .setRequired(true)
  );

const retrieveSongs = async (interaction: CommandInteraction, url: string) => {
  // Determine chosen song
  let songs: Song[] = [];

  if (url?.includes('list') && !url.includes('watch')) {
    const retrieved = await ytpl(url);
    for (let song of retrieved.items) {
      songs.push({
        requestedBy: interaction.user,
        title: song.title,
        url: song.shortUrl,
        duration: song.duration,
        thumbnail: song.thumbnails[0].url || null
      });
    }
    return songs;
  } else if (url?.includes('watch')) {
    if (ytdl.validateURL(url)) {
      const song_info = await ytdl.getInfo(url);
      songs.push({
        requestedBy: interaction.user,
        title: song_info.videoDetails.title,
        url: song_info.videoDetails.video_url,
        duration: song_info.videoDetails.lengthSeconds,
        thumbnail: song_info.videoDetails.thumbnails[0].url || null
      });
    }
    return songs;
  } else {
    return [];
  }
};

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  if (!interaction.channel) {
    return;
  }
  const guild = client.guilds.cache.get(interaction.guild?.id || '');
  const member = guild?.members.cache.get(interaction.member?.user.id || '');

  if (!member?.voice.channel || !member || !guild) {
    return interaction.reply(
      `You must be connected to a voice channel to use this command!`
    );
  }
  const permissions = member?.voice.channel.permissionsFor(member);
  if (!permissions.has('CONNECT')) {
    interaction.reply('Missing CONNECT permission to that Voice Channel.');
    return;
  }
  if (!permissions.has('SPEAK')) {
    interaction.reply('Missing SPEAK permission to that Voice Channel.');
    return;
  }

  const url = interaction.options.getString('url');
  try {
    retrieveSongs(interaction, url || '').then((songs: Song[]) => {
      const serverQueue = queue.get(guild.id);

      if (!serverQueue && member.voice.channel && interaction.channel) {
        const queueBuilder: QueueEntry = {
          voice_channel: member.voice.channel,
          text_channel: interaction.channel,
          connection: null,
          songs: []
        };
        queueBuilder.songs.push(...(songs || []));

        queue.set(guild.id, queueBuilder);

        // Connect to Voice Channel
        try {
          queueBuilder.connection = joinVoiceChannel({
            channelId: member.voice.channel.id,
            guildId: guild.id,
            adapterCreator: guild.voiceAdapterCreator
          });

          player(guild.id); // Try to play the queue

          if (url?.includes('list') && !url.includes('watch')) {
            return interaction.reply({
              embeds: [
                createEmbed({
                  title: `Music`,
                  description: `Queueing **${songs.length}** songs, starting with **${songs[0]?.title}**!`,
                  thumbnailUrl: songs[0]?.thumbnail || '',
                  url: songs[0].url,
                  color: `#87b5ff`,
                  footer: {
                    text: `白月 - Shiratsuki - Music Controller V2.5`
                  }
                })
              ]
            });
          } else {
            return interaction.reply({
              embeds: [
                createEmbed({
                  title: `Music`,
                  description: `Now playing: **${songs[0]?.title}**!`,
                  thumbnailUrl: songs[0]?.thumbnail || '',
                  url: songs[0]?.url,
                  color: `#87b5ff`,
                  footer: {
                    text: `白月 - Shiratsuki - Music Controller V2.5`
                  }
                })
              ]
            });
          }
        } catch (err) {
          console.error(err);
          queue.delete(guild.id); // Clear queue
          interaction.channel.send(
            'I had a problem connecting to the channel.. 😔'
          );
        }
      } else {
        // If server already has a queue
        serverQueue?.songs.push(...songs);
        if (url?.includes('list') && !url.includes('watch')) {
          // Playlist added to queue
          return interaction.reply({
            embeds: [
              createEmbed({
                title: `Music`,
                description: `Adding **${songs.length}** more songs to the queue, starting with **${songs[0]?.title}**!`,
                thumbnailUrl: songs[0].thumbnail || '',
                url: songs[0]?.url,
                color: `#87b5ff`,
                footer: {
                  text: `白月 - Shiratsuki - Music Controller V2.5`
                }
              })
            ]
          });
        } else {
          // One song added to queue
          return interaction.reply({
            embeds: [
              createEmbed({
                title: `Music`,
                description: `Added song to queue: **${songs[0]?.title}**!`,
                thumbnailUrl: songs[0]?.thumbnail || '',
                url: songs[0]?.url,
                color: `#87b5ff`,
                footer: {
                  text: `白月 - Shiratsuki - Music Controller V2.5`
                }
              })
            ]
          });
        }
      }
    });
  } catch (err) {
    console.warn(err);
    return interaction.reply(
      `You need to send me a valid Youtube video or playlist URL.`
    );
  }
};
