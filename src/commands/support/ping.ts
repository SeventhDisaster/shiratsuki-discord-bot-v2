import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription("白月 Shiratsuki replies with 'Pong'!");
export const global = true;

export const execute = (interaction: CommandInteraction) => {
  return interaction.reply(`Pong!`);
};
