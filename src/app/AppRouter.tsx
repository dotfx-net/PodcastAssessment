import { getConfig } from '@/app/config/loadConfig';
import { HeadProvider } from 'react-head';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from '@/app/AppLayout';
import PodcastListPage from '@/features/podcast/ui/pages/PodcastListPage';
import PodcastDetailPage from '@/features/podcast/ui/pages/PodcastDetailPage';
import EpisodePlayerPage from '@/features/podcast/ui/pages/EpisodePlayerPage';
import { usePodcastStore } from '@/features/podcast/store/podcast.store';

export async function podcastListLoader() {
  const { LIMIT_PODCASTS } = getConfig();

  const promise = usePodcastStore.getState().loadListIfOutdated(LIMIT_PODCASTS).then(() => usePodcastStore.getState().list);

  return { items: promise };
}

export async function podcastDetailLoader({ params }: { params: { podcastId?: string } }) {
  const { LIMIT_PODCASTS } = getConfig();
  const podcastId = params.podcastId!;
  const listPromise = usePodcastStore.getState().loadListIfOutdated(LIMIT_PODCASTS);
  const episodesPromise = usePodcastStore.getState().loadEpisodesIfNeeded(podcastId);

  return {
    list: listPromise.then(() => usePodcastStore.getState().list),
    episodes: episodesPromise.then((episodes) => episodes)
  };
}

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
    <HeadProvider>
      <RouterProvider router={router} />
    </HeadProvider>
  );
}

export default AppRouter;
