import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';

interface PodcastState {
  // data
  list: Podcast[];
  episodesByPodcastId: Record<string, Episode[]>;

  // meta
  listUpdatedAt: number | null;
  episodesUpdatedAt: Record<string, number>;

  // UI State
  loading: boolean;
  error: Error | null;

  // actions - setters
  setPodcasts: (podcasts: Podcast[]) => void;
  setEpisodes: (podcastId: string, episodes: Episode[]) => void;

  // actions - UI State
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;

  // cache helpers
  isListCacheValid: (ttlMs: number) => boolean;
  isEpisodesCacheValid: (podcastId: string, ttlMs: number) => boolean;

  // getters
  getPodcastById: (id: string) => Podcast | undefined;
  getEpisodes: (podcastId: string) => Episode[];

  // cache management
  clearAllCache: () => void;
  clearEpisodesCache: (podcastId: string) => void;
};

const STORAGE_KEY = 'podcast-cache-v1';

export const usePodcastStore = create<PodcastState>()(
  persist(
    (set, get) => ({
      list: [],
      episodesByPodcastId: {},
      listUpdatedAt: null,
      episodesUpdatedAt: {},
      loading: false,
      error: null,

      setPodcasts: (podcasts) => set({
        list: podcasts,
        listUpdatedAt: Date.now(),
        error: null
      }),

      setEpisodes: (podcastId, episodes) => set((state) => ({
        episodesByPodcastId: {
          ...state.episodesByPodcastId,
          [podcastId]: episodes
        },
        episodesUpdatedAt: {
          ...state.episodesUpdatedAt,
          [podcastId]: Date.now()
        },
        error: null
      })),

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error, loading: false }),

      isListCacheValid: (ttlMs) => {
        const { listUpdatedAt } = get();

        if (!listUpdatedAt) { return false; }

        return Date.now() - listUpdatedAt < ttlMs;
      },

      isEpisodesCacheValid: (podcastId, ttlMs) => {
        const { episodesUpdatedAt, episodesByPodcastId } = get();

        if (!episodesByPodcastId[podcastId]) { return false; }

        const timestamp = episodesUpdatedAt[podcastId];

        if (!timestamp) { return false; }

        return Date.now() - timestamp < ttlMs;
      },

      getPodcastById: (id) => get().list.find((p) => p.id === id),
      getEpisodes: (podcastId) => get().episodesByPodcastId[podcastId] || [],

      clearAllCache: () => set({
        list: [],
        episodesByPodcastId: {},
        listUpdatedAt: null,
        episodesUpdatedAt: {},
        error: null
      }),

      clearEpisodesCache: (podcastId) => set((state) => {
        const newEpisodes = { ...state.episodesByPodcastId };
        const newTimestamps = { ...state.episodesUpdatedAt };

        delete newEpisodes[podcastId];
        delete newTimestamps[podcastId];

        return {
          episodesByPodcastId: newEpisodes,
          episodesUpdatedAt: newTimestamps
        };
      })
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        list: state.list,
        episodesByPodcastId: state.episodesByPodcastId,
        listUpdatedAt: state.listUpdatedAt,
        episodesUpdatedAt: state.episodesUpdatedAt
      })
    }
  )
);

export const selectPodcasts = (state: PodcastState) => state.list;
export const selectLoading = (state: PodcastState) => state.loading;
export const selectError = (state: PodcastState) => state.error;
