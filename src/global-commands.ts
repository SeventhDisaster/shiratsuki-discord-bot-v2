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
  global?: boolean;
};

/**
 * List of slash commands, including options.
 */
const commands: Omit<
  SlashCommandBuilder,
  'addSubcommand' | 'addSubcommandGroup'
>[] = [];

for (const module of Object.values<Command>(commandModules)) {
  if (module.global) {
    commands.push(module.data);
  }
}

const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

rest
  .put(Routes.applicationCommands(config.CLIENT_ID), {
    body: commands
  })
  .then(() => {
    console.log('Successfully registered global application commands!');
  })
  .catch((error) => {
    console.error(error);
  });
