import { ListPodcasts } from '../domain/usecases/ListPodcasts';
import type { PodcastRepository } from '../domain/ports/PodcastRepository';

export class PodcastService {
  constructor(private deps: { podcastRepo: PodcastRepository }) {}

  list(limit: number, genre: number) {
    return new ListPodcasts(this.deps.podcastRepo).exec(limit, genre);
  }
};
