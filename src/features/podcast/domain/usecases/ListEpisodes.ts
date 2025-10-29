import { PodcastRepository } from '../ports/PodcastRepository';
import { Episode } from '../entities/Episode';

export class ListEpisodes {
  constructor(private readonly repo: PodcastRepository) {}

  async exec(podcastId: string): Promise<Episode[]> {
    return this.repo.listEpisodes(podcastId);
  }
};
