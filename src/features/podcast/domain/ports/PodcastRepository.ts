import { Podcast } from '../entities/Podcast';

export interface PodcastRepository {
  list(params: { limit: number, genre: number }): Promise<Podcast[]>;
  getById(id: string): Promise<Podcast | null>;
};
