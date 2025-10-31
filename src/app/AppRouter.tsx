import { lazy } from 'react';
import { getConfig } from '@/app/config/loadConfig';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import { di } from '@/app/config/di';
import type { Podcast } from '@/features/podcast/domain/entities/Podcast';
import type { Episode } from '@/features/podcast/domain/entities/Episode';

const PodcastListPage = lazy(() => import('@/features/podcast/ui/pages/PodcastListPage'));
const PodcastDetailPage = lazy(() => import('@/features/podcast/ui/pages/PodcastDetailPage'));
const EpisodePlayerPage = lazy(() => import('@/features/podcast/ui/pages/EpisodePlayerPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <PodcastListPage /> },
      { path: 'podcast/:podcastId', element: <PodcastDetailPage /> },
      { path: 'podcast/:podcastId/episode/:episodeId', element: <EpisodePlayerPage /> }
    ]
  }
]);

function AppRouter() {
  return (
    <RouterProvider router={router} />
  );
}

export default AppRouter;
