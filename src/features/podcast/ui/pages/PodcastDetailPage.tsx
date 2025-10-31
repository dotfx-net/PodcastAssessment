import { useParams } from 'react-router';
import { usePodcasts, useEpisodes } from '@/features/podcast/ui/hooks';
import { PodcastSummaryCard } from '@/features/podcast/ui/components/PodcastSummaryCard';
import { PodcastEpisodes } from '@/features/podcast/ui/components/PodcastEpisodes';

function PodcastDetailPage() {
  const { podcastId = '' } = useParams();
  const { listUpdatedAt, getById, loading: podcastsLoading } = usePodcasts();
  const podcast = getById(podcastId);
  const { episodes, loading: episodesLoading } = useEpisodes(podcastId);

  if ((podcastsLoading || listUpdatedAt === null) && !podcast) {
    return (
      <section>
        <h2>Loading podcast...</h2>
      </section>
    );
  }

  return (
    <>
      <title>{`Episodes | ${podcast.name}`}</title>

      <section>
        <div className="podcast-detail-layout">
          <div className="podcast-detail-left">
            <PodcastSummaryCard id={podcastId} />
          </div>

          <div className="podcast-detail-right">
            {!episodesLoading && (
              <div className="episodes-count">
                <h3>Episodes: {episodes.length}</h3>
              </div>
            )}

            {episodesLoading && !episodes.length ? (
              <div>Loading episodes...</div>
            ) : (
              <PodcastEpisodes podcastId={podcastId} episodes={episodes} />
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default PodcastDetailPage;
