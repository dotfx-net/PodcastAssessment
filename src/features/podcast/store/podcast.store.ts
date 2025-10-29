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
      loading: false,
      lastUpdated: 0,

      setLoading: (v) => set({ loading: v }),

      isOutdated: () => {
        const { lastUpdated } = get();
        const { CACHE_TTL_MS } = getConfig();

        if (!lastUpdated) { return true; }

        return Date.now() - lastUpdated > CACHE_TTL_MS;
      },

      getPodcastById: (id) => get().list.find((p) => p.id === id),

      async loadListIfOutdated(limit = 100) {
        const state = get();

        if (!!state.list.length && !state.isOutdated()) { console.log('cached'); return state.list; }

console.log('retrieving list');
        set({ loading: true });

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
        const { episodesByPodcastId } = get();

        if (!!episodesByPodcastId[podcastId]?.length) { return episodesByPodcastId[podcastId]; }

        set({ loading: true });

        try {
          const episodes = await di.podcastService.listEpisodes(podcastId);

          set((state) => ({
            episodesByPodcastId: {
              ...state.episodesByPodcastId,
              [podcastId]: episodes
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
        lastUpdated: state.lastUpdated
      })
    }
  )
);
