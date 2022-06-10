import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
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
      .setName(`url`)
      .setDescription(`The url of the video or playlist you want to play`)
      .setRequired(true)
  );

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  return interaction.reply(`Feature Coming Soon... Hopefully...`);
};
