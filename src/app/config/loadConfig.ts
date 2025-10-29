import cfg from './config.json';

interface Config {
  ALLORIGINS_URL: string;
  ITUNES_URL: string;
  ITUNES_TOPPODCASTS_PATH: string;
  ITUNES_PODCAST_EPISODE_PATH: string;
  GENRE: number;
  LIMIT: number;
}

export const getConfig = () => cfg as Config;
