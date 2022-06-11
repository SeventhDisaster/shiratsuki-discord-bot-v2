import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, EmbedField } from 'discord.js';
import { createEmbed } from '../../util/embeds';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`help`)
  .setDescription(
    `Informs the user about 白月 Shiratsuki's available commands.`
  )
  .addStringOption((option) =>
    option
      .setName('category')
      .setDescription('Choose a category to limit the size of the help command')
      .setRequired(false)
      .setChoices(
        {
          name: 'ALL',
          value: 'ALL'
        },
        {
          name: 'MUSIC',
          value: 'MUSIC'
        },
        {
          name: 'CHAT',
          value: 'CHAT'
        }
      )
  );
export const global = true;

/* HELP COMMAND CONTENTS */
type CommandListItem = {
  name: string;
  description: string;
};
const commandList: { [key: string]: CommandListItem[] } = {
  DEFAULT: [
    {
      name: 'ping',
      description:
        'Receive a basic "pong" response to indicate that the bot is active.'
    },
    {
      name: 'help',
      description:
        'Display this prompt, showing information about available commands.'
    }
  ],
  MUSIC: [
    {
      name: 'play',
      description:
        'Join your current voice channel and play a youtube video or playlist, or add to the current server queue.'
    },
    {
      name: 'skip',
      description:
        'If currently playing a song in a queue, stop the current song and play the next if there is one.'
    },
    {
      name: 'stop',
      description: 'Clear the server queue and leave the voice channel.'
    },
    {
      name: 'song',
      description: 'Display the currently playing song.'
    },
    {
      name: 'queue',
      description: 'Display the next couple of songs in the queue.'
    },
    {
      name: 'shuffle',
      description: 'Shuffle the songs in the music queue.'
    }
  ],
  CHAT: [
    {
      name: 'sevfact',
      description: 'Learn a something about my developer!'
    }
  ]
};

const getEmojiFromKey = (key: string): string => {
  switch (key) {
    case 'MUSIC':
      return '🎵';
    case 'CHAT':
      return '💬';
    default:
      return '❔';
  }
};

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  const fieldList: EmbedField[] = [];
  const option: string | null = interaction.options.getString('category');

  if (option === 'ALL' || !option) {
    for (let key in commandList) {
      let categoryCommands = commandList[key];
      for (const command of categoryCommands) {
        fieldList.push({
          name: `${getEmojiFromKey(key)} - ${command.name}`,
          value: `${command.description}`
        });
      }
    }
  } else {
    let categoryCommands = commandList[option || 'DEFAULT'];
    for (const command of categoryCommands) {
      fieldList.push({
        name: `${getEmojiFromKey(option || 'DEFAULT')} ${command.name}`,
        value: `${command.description}`
      });
    }
  }

  const embed = createEmbed({
    title: `Help${option ? ' (category : ' + option + ')' : ''}`,
    description: `Display information about ${
      option?.toLowerCase() || ''
    } commands`,
    color: '#ffffff',
    fields: fieldList
  });

  return interaction.reply({
    embeds: [embed]
  });
};
