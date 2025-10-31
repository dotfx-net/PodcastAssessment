import { useEffect } from 'react';
import { di } from '@/app/config/di';
import { getConfig } from '@/app/config/loadConfig';
import { usePodcastStore } from '@/features/podcast/application/store/podcast.store';

const episodesInFlight: Record<string, Promise<void>> = {}; // per-episode in-flight promise to avoid duplicate fetches

export function useEpisodes(podcastId: string) {
  const config = getConfig();
  const ttlMs = config.CACHE_EPISODES_TTL_MS;

  const getEpisodes = usePodcastStore((s) => s.getEpisodes);
  const episodesUpdatedAt = usePodcastStore((s) => s.episodesUpdatedAt);
  const loading = usePodcastStore((s) => s.loading);
  const error = usePodcastStore((s) => s.error);
  const episodes = getEpisodes(podcastId);

  useEffect(() => {
    const store = usePodcastStore.getState();
    const currentEpisodes = store.getEpisodes(podcastId);
    const valid = store.isEpisodesCacheValid(podcastId, ttlMs);

    if (!!currentEpisodes.length && valid) { return; }
    if (!!episodesInFlight[podcastId]) { return; }

    episodesInFlight[podcastId] = di.podcastService.listEpisodes(podcastId)
      .catch(console.error)
      .finally(() => delete episodesInFlight[podcastId]);
  }, [podcastId, ttlMs]);

  return { episodes, episodesUpdatedAt, loading, error };
}
