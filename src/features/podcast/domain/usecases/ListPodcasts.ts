import { PodcastRepository } from '../ports/PodcastRepository';
import { Podcast } from '../entities/Podcast';

export class ListPodcasts {
  constructor(private readonly repo: PodcastRepository) {}

  async exec(limit: number, genre: number): Promise<Podcast[]> {
    return this.repo.list({ limit, genre });
  }
};
