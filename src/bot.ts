import config from './config';
import * as commandModules from './commands';
import { Client } from 'discord.js';

const commands = Object(commandModules);

export const client = new Client({
  intents: ['Guilds', 'GuildMessages', 'DirectMessages', 'GuildVoiceStates']
});

client.once('ready', () => {
  console.log('Shiratsuki discord bot ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const { commandName } = interaction;
  commands[commandName].execute(interaction, client);
});

client.login(config.DISCORD_TOKEN);
