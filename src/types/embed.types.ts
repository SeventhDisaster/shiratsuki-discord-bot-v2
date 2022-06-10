import { ColorResolvable } from 'discord.js';

export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface EmbedAuthor {
  name: string;
  iconUrl?: string;
  authorUrl?: string;
}

export interface EmbedFooter {
  text: string;
  iconURL?: string;
}

export interface Embed {
  title: string;
  color: ColorResolvable;
  description?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  url?: string;
  author?: EmbedAuthor;
  fields?: EmbedField[];
  footer?: EmbedFooter;
}
