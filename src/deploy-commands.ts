import { REST } from '@discordjs/rest';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v10';
import config from './config';
import * as commandModules from './commands';

/**
 * Type of slash command.
 */
export type Command = {
  data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
};

/**
 * List of slash commands, including options.
 */
const commands: Omit<
  SlashCommandBuilder,
  'addSubcommand' | 'addSubcommandGroup'
>[] = [];

for (const module of Object.values<Command>(commandModules)) {
  commands.push(module.data);
}

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

rest
  .put(Routes.applicationGuildCommands(config.CLIENT_ID, config.GUILD_ID), {
    body: commands
  })
  .then(() => {
    console.log('Successfully registered application commands!');
  })
  .catch((error) => {
    console.error(error);
  });
