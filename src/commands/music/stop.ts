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
    `Stop any music currently playing and force the bot to leave the voice channel`
  );

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  if (!interaction.channel) {
    return;
  }
  const guild = client.guilds.cache.get(interaction.guild?.id || '');
  if (guild?.id) {
    forceExit(guild.id);
  } else {
    return interaction.reply(
      `Something went wrong. I was unable to end playback.`
    );
  }

  return interaction.reply(`You got it! Stopping playback!`);
};
