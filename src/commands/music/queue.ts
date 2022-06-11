import {
  AudioPlayerStatus,
  createAudioPlayer,
  createAudioResource,
  VoiceConnection
} from '@discordjs/voice';
import { TextBasedChannel, User, VoiceBasedChannel } from 'discord.js';
import ytdl from 'ytdl-core';

export type Song = {
  requestedBy: User;
  title: string;
  url: string;
  duration: string | null;
  thumbnail: string | null;
};

export type QueueEntry = {
  voice_channel: VoiceBasedChannel;
  text_channel: TextBasedChannel;
  connection: VoiceConnection | null;
  songs: Song[];
};

export let queue = new Map<string, QueueEntry>();
const audioPlayer = createAudioPlayer();

export const player = async (guild: string) => {
  const song_queue = queue.get(guild);

  if (!song_queue) {
    queue.delete(guild);
    return;
  }

  const getNextResource = () => {
    if (!song_queue.songs.length) {
      song_queue.connection?.destroy();
      queue.delete(guild);
    } else {
      play();
    }
  };

  const play = async () => {
    const song = song_queue.songs[0]; // Always pick from the first song
    const stream = ytdl(song?.url, {
      filter: 'audioonly',
      quality: 'highestaudio',
      highWaterMark: 1 << 25
    });
    const resource = createAudioResource(stream);
    audioPlayer.play(resource);
    song_queue.connection?.subscribe(audioPlayer);
  };

  audioPlayer.on(AudioPlayerStatus.Idle, () => {
    song_queue.songs.shift();
    getNextResource();
  });

  audioPlayer.on('error', (error) => {
    console.error(error);
  });

  getNextResource();
};

export const forceExit = async (guild: string) => {
  const song_queue: QueueEntry | undefined = queue.get(guild);

  song_queue?.connection?.destroy();
  queue.delete(guild);
};

export const skip = async () => {
  audioPlayer.stop();
};
