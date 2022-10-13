import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction, User } from 'discord.js';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`hi`)
  .setDescription(`Say hello to 白月 Shiratsuki!`);
export const global = true;

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  return interaction.reply(createGreeting(interaction.user));
};

/* Pre values are before user's name is appended to the greeting, while post is after */
const greetTemplates = [
  {
    pre: 'Oh! Hi ',
    post: '!'
  },
  {
    pre: 'あ！　',
    post: 'さん おはよう！！'
  },
  {
    pre: '',
    post: ' ごきげんよう～'
  },
  {
    pre: '',
    post: '様　こんばんは～'
  },
  {
    pre: '',
    post: '! Hey!'
  },
  {
    pre: "It's not like I'm happy you're here or anything.. ",
    post: ', you dummy.. :flushed:'
  },
  {
    pre: 'Ah! ',
    post: ". You're here!"
  },
  {
    pre: 'Hey, ',
    post: "! What's up!"
  },
  {
    pre: '',
    post: ' is here! やった！！'
  },
  {
    pre: 'あああ、',
    post: ' 出た！'
  },
  {
    pre: 'もしもし！ ',
    post: ' 元気？！'
  },
  {
    pre: '',
    post: ' お会いできて光栄です!'
  },
  {
    pre: '',
    post: ' しばらくぶりですね'
  },
  {
    pre: 'おっす ',
    post: 'さん'
  },
  {
    pre: '',
    post: '! やっほ～'
  },
  {
    pre: '',
    post: '! Hello!'
  },
  {
    pre: '',
    post: '! How are you?!'
  },
  {
    pre: '',
    post: '! Thanks for saying hi!!'
  },
  {
    pre: 'Yo!',
    post: "! You're here!!"
  },
  {
    pre: 'Oh!',
    post: "! I've been waiting for you!"
  },
  {
    pre: '',
    post: "! I'm your biggest fan!"
  },
  {
    pre: 'きゅん！〜',
    post: '先輩だ! べ。。別に好きってわけじゃないんだから、バカ〜'
  },
  {
    pre: '',
    post: '! Thank you for saying hi!!'
  }
];

const createGreeting = (user: User) => {
  let rand = Math.floor(Math.random() * greetTemplates.length);
  return `${greetTemplates[rand].pre}${user}${greetTemplates[rand].post}`;
};
