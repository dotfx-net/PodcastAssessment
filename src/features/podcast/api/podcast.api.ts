import { getConfig } from '@/app/config/loadConfig';
import type { HttpClient } from '@/core/api/HttpClient';
import type { ITunesTopPodcastsFeedResponse, ITunesTopPodcastsEntry, ITunesPodcastFeedResponse, ITunesPodcastEpisode } from './itunes';

export type PodcastDTO = {
  id: string;
  name: string;
  author: string;
  imageUrl: string;
  date: string;
  summary: string;
};

export type EpisodeDTO = {
  id: string;
  title: string;
  duration: number;
  date: string;
  description: string;
  audioUrl: string;
};

const getImage = (images: ITunesTopPodcastsEntry['im:image']): string => {
  if (!images?.length) { return ''; }

  return images[images.length - 1].label || '';
};

export const mapPodcastEntryToPodcastDTO = (entry: ITunesTopPodcastsEntry): PodcastDTO => {
  const id = entry.id?.attributes?.['im:id'] ?? '';
  const name = entry['im:name']?.label ?? entry.title?.label ?? '';
  const author = entry['im:artist']?.label ?? '';
  const imageUrl = getImage(entry['im:image']);
  const date = entry['im:releaseDate']?.label ?? '';
  const summary = entry.summary?.label ?? '';

  return {
    id,
    name,
    author,
    imageUrl,
    date,
    summary
  };
};

export const mapEpisodeEntryToEpisodeDTO = (entry: ITunesPodcastEpisode): EpisodeDTO => {
  const id = String(entry?.trackId ?? '');
  const title = entry?.trackName ?? '';
  const duration = entry?.trackTimeMillis ?? 0;
  const date = entry?.releaseDate ?? '';
  const description = entry?.description ?? '';
  const audioUrl = entry?.episodeUrl ?? '';

  return {
    id,
    title,
    duration,
    date,
    description,
    audioUrl
  };
};

export function makePodcastApi(http: HttpClient) {
  return {
    async list(limit: number): Promise<PodcastDTO[]> {
      const { ITUNES_TOPPODCASTS_PATH } = getConfig();
      const path = ITUNES_TOPPODCASTS_PATH.replace('{{LIMIT_PODCASTS}}', String(limit));

      const res = await http.get<ITunesTopPodcastsFeedResponse>(path);
      const entries = res.feed?.entry ?? [];

      return entries.slice(0, limit).map(mapPodcastEntryToPodcastDTO);
    },
    async listEpisodes(podcastId: string): Promise<EpisodeDTO[]> {
      const { ITUNES_PODCAST_EPISODE_PATH, LIMIT_EPISODES } = getConfig();
      const path = ITUNES_PODCAST_EPISODE_PATH.replace('{{PODCAST_ID}}', podcastId).replace('{{LIMIT_EPISODES}}', LIMIT_EPISODES);

      const res = await http.get<ITunesTopPodcastsFeedResponse>(path);
      const episodes = res?.results ?? [];

      return episodes.filter((episode) => episode.wrapperType == 'podcastEpisode').map(mapEpisodeEntryToEpisodeDTO);
    }
  };
}
