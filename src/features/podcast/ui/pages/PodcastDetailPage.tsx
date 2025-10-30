import { Suspense, useMemo, use } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import { PodcastSummaryCard } from '@/features/podcast/ui/components/PodcastSummaryCard';
import { PodcastEpisodes } from '@/features/podcast/ui/components/PodcastEpisodes';

type LoaderData = {
  list: Promise<Podcast[]>;
  episodes: Promise<Episode[]>;
};

function PodcastDetailPage() {
  const { podcastId = '' } = useParams();
  const data = useLoaderData() as LoaderData;
  const list = use(data.list);
  const episodes = use(data.episodes);
  const podcast = useMemo(() => list.find((p) => p.id === podcastId), [list, podcastId]);

  if (!podcast) { throw new Error('Podcast Id not found'); }
  if (!episodes.length) { throw new Error('Podcast is empty'); }

  return (
    <section>
      <Suspense fallback={<h2>Loading podcast...</h2>}>
        <div className="podcast-detail-layout">
          <div className="podcast-detail-left">
            <PodcastSummaryCard id={podcastId} />
          </div>

          <div className="podcast-detail-right">
            <div className="episodes-count">
              <h3>Episodes: {episodes.length}</h3>
            </div>

            <PodcastEpisodes podcastId={podcastId} episodes={episodes} />
          </div>
        </div>
      </Suspense>
    </section>
  );
}

export default PodcastDetailPage;
