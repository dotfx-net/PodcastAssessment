import type { PodcastRepository } from '../domain/ports/PodcastRepository';
import { makePodcastApi } from '../api/podcast.api';
import { toPodcastEntity, toEpisodeEntity } from '../api/mappers';
import type { HttpClient } from '@/core/api/HttpClient';

export class HttpPodcastRepository implements PodcastRepository {
  private api = makePodcastApi(this.http);

  constructor(private readonly http: HttpClient) {}

  async list(limit: number) {
    const dtos = await this.api.list(limit);

    return dtos.map(toPodcastEntity);
  }

  async listEpisodes(podcastId: string) {
    const dtos = await this.api.listEpisodes(podcastId);

    return dtos.map(toEpisodeEntity);
  }
};
