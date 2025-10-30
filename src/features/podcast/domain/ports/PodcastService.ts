import { ListPodcasts } from '../domain/usecases/ListPodcasts';
import { ListEpisodes } from '../domain/usecases/ListEpisodes';
import type { PodcastRepository } from '../domain/ports/PodcastRepository';

export class PodcastService {
  constructor(private deps: { podcastRepo: PodcastRepository }) {}

  list(limit: number) {
    return new ListPodcasts(this.deps.podcastRepo).exec(limit);
  }

  listEpisodes(podcastId: string) {
    return new ListEpisodes(this.deps.podcastRepo).exec(podcastId);
  }
};
