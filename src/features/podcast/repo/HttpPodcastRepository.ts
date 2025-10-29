import type { PodcastRepository } from '../domain/ports/PodcastRepository';
import { makePodcastApi } from '../api/podcast.api';
import { toPodcastEntity } from '../api/mappers';
import type { HttpClient } from '@/core/api/HttpClient';

export class HttpPodcastRepository implements PodcastRepository {
  private api = makePodcastApi(this.http);

  constructor(private readonly http: HttpClient) {}

  async list({ limit, genre }: { limit: number, genre: number }) {
    const dtos = await this.api.list(limit, genre);

    return dtos.map(toPodcastEntity);
  }

  async getById(id: string) {
    const dto = await this.api.getById(id);

    return toPodcastEntity(dto);
  }
};
