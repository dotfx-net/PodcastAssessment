import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getConfig } from '@/app/config/loadConfig';
import { di } from '@/app/config/di';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';

type PodcastState = {
  // data
  list: Podcast[];
  episodesByPodcastId: Record<string, Episode[]>;
  episodesUpdatedAt: Record<string, number>;

  // meta
  loading: boolean;
  lastUpdated?: number;

  // actions
  setLoading: (v: boolean) => void;

  // fetchers (services behind DI)
  isOutdated: () => boolean;
  getPodcastById: (id: string) => Podcast | undefined;
  loadListIfOutdated: (limit?: number) => Promise<Podcast[]>;
  loadEpisodesIfNeeded: (podcastId: string) => Promise<Episode[]>;
};

const STORAGE_KEY = 'podcast-cache-v1';

export const usePodcastStore = create<PodcastState>()(
  persist(
    (set, get) => ({
      list: [],
      episodesByPodcastId: {},
      episodesUpdatedAt: {},
      loading: false,
      lastUpdated: 0,

      setLoading: (v) => set({ loading: v }),

      isOutdated: () => {
        const { lastUpdated } = get();
        const { CACHE_PODCASTS_TTL_MS } = getConfig();

        if (!lastUpdated) { return true; }

        return Date.now() - lastUpdated > CACHE_PODCASTS_TTL_MS;
      },

      getPodcastById: (id) => get().list.find((p) => p.id === id),

      async loadListIfOutdated(limit = 100) {
        const state = get();

        set({ loading: true });

        if (!!state.list.length && !state.isOutdated()) {
          set({ loading: false });

          return state.list;
        }

        try {
          const items = await di.podcastService.list(limit);

          set({
            list: items,
            episodesByPodcastId: {},
            lastUpdated: Date.now(),
            loading: false
          });

          return items;
        } catch (error: any) {
          set({ loading: false });
          throw error;
        }
      },

      async loadEpisodesIfNeeded(podcastId: string) {
        const { episodesByPodcastId, episodesUpdatedAt } = get();
        const { CACHE_EPISODES_TTL_MS } = getConfig();
        const now = Date.now();
        const lastUpdate = episodesUpdatedAt[podcastId];
        const cacheValid = lastUpdate && now - lastUpdate < CACHE_EPISODES_TTL_MS;

        set({ loading: true });

        if (!!episodesByPodcastId[podcastId]?.length && cacheValid) {
          set({ loading: false });

          return episodesByPodcastId[podcastId];
        }

        try {
          const episodes = await di.podcastService.listEpisodes(podcastId);

          set((state) => ({
            episodesByPodcastId: {
              ...state.episodesByPodcastId,
              [podcastId]: episodes
            },
            episodesUpdatedAt: {
              ...state.episodesUpdatedAt,
              [podcastId]: now
            },
            loading: false
          }));

          return episodes;
        } catch (error: any) {
          set({ loading: false });
          throw error;
        }
      }
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        list: state.list,
        episodesByPodcastId: state.episodesByPodcastId,
        episodesUpdatedAt: state.episodesUpdatedAt,
        lastUpdated: state.lastUpdated
      })
    }
  )
);
