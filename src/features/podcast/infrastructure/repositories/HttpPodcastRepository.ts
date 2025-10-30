import type { PodcastRepository } from '@/features/podcast/domain/ports/PodcastRepository';
import { makePodcastApi } from '@/features/podcast/infrastructure/adapters/http/podcast.api';
import { toPodcastEntity, toEpisodeEntity } from '@/features/podcast/infrastructure/adapters/http/itunes.mappers';
import type { HttpClient } from '@/shared/infrastructure/HttpClient';

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
