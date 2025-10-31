import { IPodcastService } from '@/domain/podcast/ports/services/IPodcastService';
import { ListPodcasts } from '@/features/podcast/domain/usecases/ListPodcasts';
import { ListEpisodes } from '@/features/podcast/domain/usecases/ListEpisodes';
import type { PodcastRepository } from '@/features/podcast/domain/ports/PodcastRepository';
import type { Podcast } from '@/features/podcast/domain/entities/Podcast';
import type { Episode } from '@/features/podcast/domain/entities/Episode';
import { usePodcastStore } from '../store/podcast.store';
import { getConfig } from '@/app/config/loadConfig';

export class PodcastService {
  constructor(private deps: { podcastRepo: PodcastRepository }) {}

  async list(limit: number): Promise<Podcast[]> {
    const store = usePodcastStore.getState();
    const config = getConfig();

    if (store.isListCacheValid(config.CACHE_PODCASTS_TTL_MS)) { return store.list; }

    store.setLoading(true);

    try {
      const useCase = new ListPodcasts(this.deps.podcastRepo);
      const podcasts = await useCase.exec(limit);

      store.setPodcasts(podcasts);

      return podcasts;
    } catch (error) {
      store.setError(error as Error);
      throw error;
    } finally {
      store.setLoading(false);
    }
  }

  async listEpisodes(podcastId: string): Promise<Episode[]> {
    const store = usePodcastStore.getState();
    const config = getConfig();

    if (store.isEpisodesCacheValid(podcastId, config.CACHE_EPISODES_TTL_MS)) { return store.getEpisodes(podcastId); }

    store.setLoading(true);

    try {
      const useCase = new ListEpisodes(this.deps.podcastRepo);
      const episodes = await useCase.exec(podcastId);

      store.setEpisodes(podcastId, episodes);

      return episodes;
    } catch (error) {
      store.setError(error as Error);
      throw error;
    } finally {
      store.setLoading(false);
    }
  }
};
