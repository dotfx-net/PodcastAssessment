import { getConfig } from './loadConfig';
import { FetchHttpClient } from '@/shared/infrastructure/http/FetchHttpClient';
import { HttpPodcastRepository } from '@/features/podcast/infrastructure/repositories/HttpPodcastRepository';
import { PodcastService } from '@/features/podcast/application/services/PodcastService';

function makeDeps() {
  const { ITUNES_URL } = getConfig();
  const http = new FetchHttpClient(ITUNES_URL);
  const podcastRepo = new HttpPodcastRepository(http);

  return {
    podcastService: new PodcastService({ podcastRepo }),
  };
}

export const di = makeDeps();
