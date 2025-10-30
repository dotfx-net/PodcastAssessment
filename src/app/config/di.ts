import { getConfig } from '@/app/config/loadConfig';
import { FetchHttpClient } from '@/shared/infrastructure/http/FetchHttpClient';
import { HttpPodcastRepository } from '@/features/podcast/infrastructure/repositories/HttpPodcastRepository';
import { PodcastService } from '@/features/podcast/application/services/PodcastService';
import type { HttpClient } from '@/shared/infrastructure/http/HttpClient';
import type { PodcastRepository } from '@/features/podcast/domain/ports/PodcastRepository';

class DIContainer {
  private static instance: DIContainer;

  private _httpClient: HttpClient | null = null;
  private _podcastRepository: PodcastRepository | null = null;
  private _podcastService: PodcastService | null = null;

  private constructor() {}

  static getInstance(): DIContainer {
    if (!DIContainer.instance) { DIContainer.instance = new DIContainer(); }

    return DIContainer.instance;
  }

  get httpClient(): HttpClient {
    if (!this._httpClient) {
      const config = getConfig();

      this._httpClient = new FetchHttpClient(config.ITUNES_URL);
    }

    return this._httpClient;
  }

  get podcastRepository(): PodcastRepository {
    if (!this._podcastRepository) { this._podcastRepository = new HttpPodcastRepository(this.httpClient); }

    return this._podcastRepository;
  }

  get podcastService(): PodcastService {
    if (!this._podcastService) { this._podcastService = new PodcastService({ podcastRepo: this.podcastRepository }); }

    return this._podcastService;
  }
}

export const di = DIContainer.getInstance();
