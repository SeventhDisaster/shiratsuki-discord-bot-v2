import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, ColorResolvable, CommandInteraction } from 'discord.js';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`avatar`)
  .setDescription(`Display a larger version of a user's profile picture`)
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('The user whose profile picture you want to display')
      .setRequired(true)
  );
export const global = true;

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  const user = interaction.options.getUser('user');

  if (!user) {
    return interaction.reply(`I couldn't find that user.`);
  }

  try {
    const avatarEmbed = {
      title: `${user.username}`,
      description:
        user.id === '601848307093995521'
          ? 'My profile picture was drawn by soresaki!\nCheck out @1100_2299 on Twitter! 🎨'
          : `Displaying ${user}'s profile picture`,
      color: `#7E47FF` as ColorResolvable,
      image: {
        url: `${user.avatarURL({ dynamic: true }) + '?size=2048'}`
      },
      footer: {
        text: '白月 - Shiratsuki Avatar Viewer'
      }
    };

    return interaction.reply({
      embeds: [avatarEmbed]
    });
  } catch (e) {
    return interaction.reply(
      `I was unable to show the requested profile picture.`
    );
  }
};
