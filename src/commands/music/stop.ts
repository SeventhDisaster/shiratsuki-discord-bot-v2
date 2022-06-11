import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
import { forceExit } from './queue';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`stop`)
  .setDescription(
    `Stop any music currently playing and force 白月 Shiratsuki to leave the voice channel`
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

  if (guild?.id) {
    forceExit(guild.id);
  } else {
    return interaction.reply(
      `Something went wrong. I was unable to end playback.`
    );
  }

  return interaction.reply(`かしこまりました！ Stopping playback! 🔇`);
};
