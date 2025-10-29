import { getConfig } from '@/app/config/loadConfig';
import type { HttpClient } from '@/core/api/HttpClient';
import type { ITunesFeedResponse, ITunesEntry } from './itunes';

export type PodcastDTO = {
  id: string;
  name: string;
  author: string;
  imageUrl: string;
  date: string;
};

const getImage = (images: ITunesEntry['im:image']): string => {
  if (!images?.length) { return ''; }

  return images[images.length - 1].label || '';
};

export const mapEntryToDTO = (entry: ITunesEntry): PodcastDTO => {
  const id = entry.id?.attributes?.['im:id'] ?? '';
  const name = entry['im:name']?.label ?? entry.title?.label ?? '';
  const author = entry['im:artist']?.label ?? '';
  const imageUrl = getImage(entry['im:image']);
  const date = entry['im:releaseDate']?.label ?? '';

  return {
    id,
    name,
    author,
    imageUrl,
    date
  };
};

export function makePodcastApi(http: HttpClient) {
  return {
    async list(limit: number): Promise<PodcastDTO[]> {
      const { ITUNES_TOPPODCASTS_PATH } = getConfig();
      const path = ITUNES_TOPPODCASTS_PATH.replace('{{LIMIT}}', String(limit));

      const res = await http.get<ITunesFeedResponse>(path);
      const entries = res.feed?.entry ?? [];

      return entries.slice(0, limit).map(mapEntryToDTO);
    },
    async getById(id: string): Promise<PodcastDTO> {
      const { ITUNES_PODCAST_EPISODE_PATH } = getConfig();
      const path = ITUNES_PODCAST_EPISODE_PATH.replace('{{PODCAST_ID}}', id);

      return http.get<PodcastDTO>(path);
    }
  };
}
