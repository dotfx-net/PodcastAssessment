import { getConfig } from './loadConfig';
import { FetchHttpClient } from '@/core/api/FetchHttpClient';
import { HttpPodcastRepository } from '@/features/podcast/repo/HttpPodcastRepository';
import { PodcastService } from '@/features/podcast/application/PodcastService';

function makeDeps() {
  const { ITUNES_URL } = getConfig();
  const http = new FetchHttpClient(ITUNES_URL);
  const podcastRepo = new HttpPodcastRepository(http);

  return {
    podcastService: new PodcastService({ podcastRepo }),
  };
}

export const di = makeDeps();
