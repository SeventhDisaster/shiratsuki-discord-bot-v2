import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { song } from '..';
import { createEmbed } from '../../util/embeds';
import { queue } from './queue';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`song`)
  .setDescription(`Display 白月 Shiratsuki's currently playing song`);
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
  if (!song_queue || !song_queue.songs.length) {
    return interaction.reply(
      `This server currently doesn't have any songs playing!`
    );
  }

  const song = song_queue.songs[0];
  return interaction.reply({
    embeds: [
      createEmbed({
        title: `Music`,
        description: `Currently Playing **${song.title}**! 🎵`,
        thumbnailUrl: song.thumbnail || '',
        url: song.url,
        color: `#87b5ff`,
        footer: {
          text: `白月 - Shiratsuki - Music Controller V3`
        }
      })
    ]
  });
};
