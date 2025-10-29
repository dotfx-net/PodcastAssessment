import { getConfig } from '@/app/config/loadConfig';
import { HeadProvider } from 'react-head';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/app/Layout';
import PodcastListPage from '@/features/podcast/ui/pages/PodcastListPage';
import PodcastDetailPage from '@/features/podcast/ui/pages/PodcastDetailPage';
import EpisodePlayerPage from '@/features/podcast/ui/pages/EpisodePlayerPage';
import { di } from '@/app/config/di';

export async function podcastListLoader() {
  const { LIMIT, GENRE } = getConfig();

  try {
    const items = await di.podcastService.list(LIMIT, GENRE);

    return { items };
  } catch (e: any) {
    throw new Error(e?.message ?? 'Error');
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
