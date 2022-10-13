import { EmbedBuilder } from 'discord.js';
import { Embed } from '../types/embed.types';

/**
 * Creates an embed for discord
 * @param embedInfo Information to insert into the embed
 * @returns The embed object that must be posted in the relevant channel
 */
export const createEmbed = (embedInfo: Embed): EmbedBuilder => {
  const embed = new EmbedBuilder();

  // Set all properties
  embed.setTitle(embedInfo.title);
  embed.setColor(embedInfo.color);

  embedInfo.description && embed.setDescription(embedInfo.description);
  embedInfo.thumbnailUrl && embed.setThumbnail(embedInfo.thumbnailUrl);
  embedInfo.imageUrl && embed.setImage(`attachment://${embedInfo.imageUrl}`);
  embedInfo.fields && embed.addFields(embedInfo.fields);
  embedInfo.url && embed.setURL(embedInfo.url);
  embedInfo.author && embed.setAuthor(embedInfo.author);

  // Properties with defaults
  embedInfo.footer
    ? embed.setFooter(embedInfo.footer)
    : {
        text: `白月 Shiratsuki Discord Bot v2`
      };

  return embed;
};
