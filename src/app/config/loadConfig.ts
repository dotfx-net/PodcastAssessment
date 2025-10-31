import config from './config.json';

interface Config {
  ITUNES_URL: string;
  ITUNES_TOPPODCASTS_PATH: string;
  ITUNES_PODCAST_EPISODE_PATH: string;
  LIMIT_PODCASTS: number;
  LIMIT_EPISODES: number;
  CACHE_PODCASTS_TTL_MS: number;
  CACHE_EPISODES_TTL_MS: number;
  INTL_FORMAT: string;
};

export const getConfig = () => config as Config;
