import { lazy } from 'react';
import { getConfig } from '@/app/config/loadConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { di } from '@/app/config/di';
import type { Podcast } from '@/features/podcast/domain/entities/Podcast';
import type { Episode } from '@/features/podcast/domain/entities/Episode';

export async function podcastListLoader() {
  const config = getConfig();
  const itemsPromise = di.podcastService.list(config.LIMIT_PODCASTS).catch((error) => [] as Podcast[]);

  return { items: itemsPromise };
}

export async function podcastDetailLoader({ params }: { params: { podcastId?: string } }) {
  const config = getConfig();
  const podcastId = params.podcastId!;
  const listPromise = di.podcastService.list(config.LIMIT_PODCASTS).catch((error) => [] as Podcast[]);
  const episodesPromise = di.podcastService.listEpisodes(podcastId).catch((error) => [] as Episode[]);

  return {
    list: listPromise,
    episodes: episodesPromise
  };
}

const PodcastListPage = lazy(() => import('@/features/podcast/ui/pages/PodcastListPage'));
const PodcastDetailPage = lazy(() => import('@/features/podcast/ui/pages/PodcastDetailPage'));
const EpisodePlayerPage = lazy(() => import('@/features/podcast/ui/pages/EpisodePlayerPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <PodcastListPage />, loader: podcastListLoader },
      { path: 'podcast/:podcastId', element: <PodcastDetailPage />, loader: podcastDetailLoader },
      { path: 'podcast/:podcastId/episode/:episodeId', element: <EpisodePlayerPage />, loader: podcastDetailLoader }
    ]
  }
]);

function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;
