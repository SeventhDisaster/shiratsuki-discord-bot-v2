import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { skip } from './queue';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`skip`)
  .setDescription(
    `Skip the currently playing song and move on to the next in 白月 Shiratsuki's queue.`
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
  const member = guild?.members.cache.get(interaction.member?.user.id || '');

  if (!member?.voice.channel || !member || !guild) {
    return interaction.reply(
      `You must be connected to a voice channel to use this command!`
    );
  }

  skip();

  return interaction.reply(`Skipped the current song! ⏭️`);
};
