import { ListPodcasts } from '@/features/podcast/domain/usecases/ListPodcasts';
import { ListEpisodes } from '@/features/podcast/domain/usecases/ListEpisodes';
import type { PodcastRepository } from '@/features/podcast/domain/ports/PodcastRepository';

export class PodcastService {
  constructor(private deps: { podcastRepo: PodcastRepository }) {}

  list(limit: number) {
    return new ListPodcasts(this.deps.podcastRepo).exec(limit);
  }

  listEpisodes(podcastId: string) {
    return new ListEpisodes(this.deps.podcastRepo).exec(podcastId);
  }
};
