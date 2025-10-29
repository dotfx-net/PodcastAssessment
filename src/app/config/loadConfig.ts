import cfg from './config.json';

interface Config {
  ITUNES_URL: string;
  ITUNES_TOPPODCASTS_PATH: string;
  ITUNES_PODCAST_EPISODE_PATH: string;
  LIMIT: number;
  CACHE_TTL_MS: number;
}

export const getConfig = () => cfg as Config;
