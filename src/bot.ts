import { Client } from 'discord.js';
import * as commandModules from './commands';
import config from './config';

const commands = Object(commandModules);

export const client = new Client({
  intents: [
    1, // Guilds
    512, // GuildMessages
    4096, // DirectMessages
    128 // GuildVoiceStates
  ]
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
