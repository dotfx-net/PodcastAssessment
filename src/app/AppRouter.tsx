import { getConfig } from '@/app/config/loadConfig';
import { HeadProvider } from 'react-head';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import PodcastListPage from '@/features/podcast/ui/pages/PodcastListPage';
import PodcastDetailPage from '@/features/podcast/ui/pages/PodcastDetailPage';
import EpisodePlayerPage from '@/features/podcast/ui/pages/EpisodePlayerPage';
import { di } from '@/app/config/di';

export async function podcastListLoader() {
  const { LIMIT, GENRE } = getConfig();

  try {
    return { items: di.podcastService.list(LIMIT, GENRE) };
  } catch (e: any) {
    throw new Error(e?.message ?? 'Error');
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <PodcastListPage />, loader: podcastListLoader },
      { path: 'podcast/:podcastId', element: <PodcastDetailPage /> },
      { path: 'podcast/:podcastId/episode/:episodeId', element: <EpisodePlayerPage /> }
    ]
  }
]);

function AppRouter() {
  return (
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  );
}

export default AppRouter;
