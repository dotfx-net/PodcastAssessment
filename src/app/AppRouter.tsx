import { HeadProvider } from 'react-head';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '@/app/Layout';
import PodcastListPage from '@/features/podcast/ui/pages/PodcastListPage';
import PodcastDetailPage from '@/features/podcast/ui/pages/PodcastDetailPage';
import EpisodePlayerPage from '@/features/podcast/ui/pages/EpisodePlayerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <PodcastListPage /> },
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
