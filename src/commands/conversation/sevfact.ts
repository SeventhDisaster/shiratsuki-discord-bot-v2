import { SlashCommandBuilder } from '@discordjs/builders';
import { Client, CommandInteraction } from 'discord.js';
// Rembember to add the export for this command to commands/index.ts

/**
 * Command Details
 */
export const data = new SlashCommandBuilder()
  .setName(`sevfact`)
  .setDescription(
    `Learn something fun about Shiratsuki's developer 'Seventh'!`
  );

/**
 * Command Action and Reply
 */
export const execute = (interaction: CommandInteraction, client: Client) => {
  let randomIndex = Math.floor(Math.random() * sevfactResponses.length);
  return interaction.reply(`${sevfactResponses[randomIndex]}`);
};

const sevfactResponses = [
  'Sev really likes black and white! :white_square_button:',
  "He's a nerd.",
  "He's slightly susceptible to burnout.",
  'He likes pizza. 🍕',
  "Sev doesn't mind pinapple on pizza, but does not go out of his way to add it.",
  "He's great at sleeping, but very bad at actually going to bed.",
  'He prefers black coffee without any milk or sugar.',
  'Sev has a habit of endlessly watching youtube videos.',
  "If he's distracted by videos or memes, there is a 99% chance he didn't hear what you just said in a conversation.",
  'Due to a traumatic event, he has a fear of salt dispensers that disassemble easily.',
  'He enjoys looking at pretty stuff!',
  'Sev has worked a lot with tech support.',
  "He's not an 'in-the-spotlight' type of person.",
  'He always wants to get better at things, but also always wants to nothing',
  "He's a Norwegian! :flag_no: ",
  "Sev doesn't talk a lot in servers, but he's reading the conversations.",
  'He often forgets to respond to messages.',
  "He's bad at remembering names and birthdays.",
  'Sev likes taking walks if the weather is alright. Always brings some coffee for walks.',
  'He likes winter a lot, but not the cold.',
  "Sev isn't picky about food.",
  "He easily feels guilty when he's not being productive.",
  'He developed me!',
  "He has a drivers license, but doesn't really like driving.",
  "Sev's PC seems to randomly bluescreen. He knows why, but the fix is too bothersome to do.",
  "Sev wants to tweet a lot, but never knows what to tweet so he just kinda doesn't.",
  "He's never done karaoke.",
  'He really likes coffee flavored ice-cream.',
  "He's played a lot of games.",
  'He likes fish! 🐟 (Salmon is best)',
  "His Animal Crossing: New Horizons island is named 'Somnholm', which is supposed to mean 'Isle of sleep'.",
  "Sev 'got over it' in 4m 33.213s",
  'Sev currently mains the Sword and Shield in Monster Hunter games.',
  'He struggles thinking of facts about himself to add.',
  'Sev likes puns!',
  'He uses the inkbrush as a primary weapon in the Splatoon series.',
  "Sev likes keeping things clean, always washing the dishes as soon as they're used.",
  "He isn't a big fan of very sweet things.",
  "More people refer to him as 'Sev' instead of his real name.",
  "He's an introvert.",
  'According to the 16personalities tests, his personality type is ISTJ-A.',
  'His zodiac sign is Scorpio.',
  'According to chinese new years, he was born in a *Year of the Ox*',
  'Unsurprisingly, his favorite number is 7.',
  'He prefers simpler, more Modern design over intricate traditional design.',
  'He loves ramen. 🍜',
  "He appreciates that you're interested in facts about him!",
  "Sev doesn't really have a musical preference, if it's sounds fancy he'll listen to anything.",
  'He works as a full stack programmer specializing in front-end development!',
  'His favorite Pokemon is Absol!',
  'Sev received his first personal PC at age 2!',
  'His favorite game as a child was Super Mario 64',
  'He thinks time is cooler than space',
  'His favorite season is Winter',
  'He likes tangerines.',
  'When he was a child he dreamt of being an Astronaut!',
  'Something that recently made him happy was getting to know a bunch of new people!',
  'His eye color is black!',
  'His hair color is black!',
  'Sev is very happy that you are having fun reading the Sev facts!',
  'He often wants to do things but also not do things.',
  "He's trying his best! Probably.",
  'Sev should try to go to sleep earlier.',
  'Sev thinks his friends should try to go to sleep earlier.',
  'He owns a PS5 controller but not an actual PS5',
  "He's ok I guess.",
  'Very likely to die from caffeine shock! ☕',
  'Favorite lipton tea flavor is Earl Gray.',
  'Very good at forgetting things.',
  'Sev is capable to stop thinking on command!',
  'He owns nothing but black or gray socks. Some have white stripes I guess.',
  "He's learned how to express 'okuyukashisa'... It's too hard to explain so I'll leave it at that.",
  'Sev has never been hospitalized for any reason.',
  'He exists!',
  '友達のおかげでセヴは日本語を学んできた！',
  'In November of 2022, Sev spent a whole month in Japan!',
  'Sev thinks there are too many games to play, but too little time to play them.',
  'At the time of writing this fact, Sev had a weird craving for noodles...',
  "Sev thought of adding a feature to this command that would prevent the same fact from showing up twice! He didn't do it because he's too lazy.",
  'Sev plays Splatoon a lot, so much he decided to make a webapp to randomize your weapons! You can even use it in Japanese! You can see it here: https://splat-rand.seventh-tech.com/',
  "He's been planning on finishing his personal website for many years but never gets around to actually doing it.",
  'Sev treasures his free time above anything else, and will try not to focus on doing any work after hours.',
  "Sev's ideal place of rest is in a warm outdoor bath under a calm starry night.",
  "Sev's second best place of rest is in front of a warm fireplace under a blanket on a rainy day with a cup of hot chocolate.",
  'He got dragged into playing Genshin Impact by one of his friends, and ended up addicted to it.',
  'Sev can play Factorio for several hours and have a great time with it.',
  "Sev's single most played game on steam is Terraria at over 1000 hours.",
  'He is OK at Tetris.',
  "He doesn't seem to like when packages have major version update... They seem to be hard to migrate and have been the reason I've broken so many times!",
  'He likes answering questions I guess!',
  'Sev thinks that adding all of these facts may be a problem in terms of his own privacy...',
  "Sev doesn't like bugs...",
  'He likes technology! Except printers.'
];
