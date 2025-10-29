import { Podcast } from '../entities/Podcast';
import { Episode } from '../entities/Episode';

export interface PodcastRepository {
  list(limit: number): Promise<Podcast[]>;
  listEpisodes(podcastId: string): Promise<Episode[]>;
};
