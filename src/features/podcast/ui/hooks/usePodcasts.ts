import { useEffect } from 'react';
import { di } from '@/app/config/di';
import { getConfig } from '@/app/config/loadConfig';
import { usePodcastStore } from '@/features/podcast/application/store/podcast.store';

let listInFlight: Promise<void> | null = null; // shared in-flight promise to avoid duplicate fetches

export function usePodcasts() {
  const config = getConfig();
  const ttlMs = config.CACHE_PODCASTS_TTL_MS;
  const limit = config.LIMIT_PODCASTS;

  const items = usePodcastStore((s) => s.list);
  const listUpdatedAt = usePodcastStore((s) => s.listUpdatedAt);
  const getById = usePodcastStore((s) => s.getPodcastById);
  const loading = usePodcastStore((s) => s.loading);
  const error = usePodcastStore((s) => s.error);

  useEffect(() => {
    const store = usePodcastStore.getState();
    const valid = store.isListCacheValid(ttlMs);

    if (!!store.list.length && valid) { return; }
    if (!!listInFlight) { return; }

    listInFlight = di.podcastService.list(limit)
      .catch(console.error)
      .finally(() => listInFlight = null);
  }, [limit, ttlMs]);

  return { items, listUpdatedAt, getById, loading, error };
}
