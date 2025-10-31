import { useMemo } from 'react';
import { useParams } from 'react-router';
import { usePodcasts, useEpisodes } from '@/features/podcast/ui/hooks';
import { PodcastSummaryCard } from '@/features/podcast/ui/components/PodcastSummaryCard';
import { PodcastEpisodePlayer } from '@/features/podcast/ui/components/PodcastEpisodePlayer';

function EpisodePlayerPage() {
  const { podcastId = '', episodeId = '' } = useParams();
  const { listUpdatedAt, getById, loading: podcastsLoading } = usePodcasts();
  const podcast = getById(podcastId);
  const { episodes, episodesUpdatedAt, loading: episodesLoading } = useEpisodes(podcastId);
  const episode = useMemo(
    () => episodes.find((e) => e.id === episodeId),
    [episodes, episodeId]
  );

  if (((podcastsLoading || listUpdatedAt === null) || (episodesLoading || episodesUpdatedAt === null)) && (!podcast || !episode)) {
    return (
      <section>
        <h2>Loading episode...</h2>
      </section>
    );
  }

  return (
    <>
      <title>{episode.title} - {podcast.name}</title>

      <section>
        <div className="podcast-detail-layout">
          <div className="podcast-detail-left">
            <PodcastSummaryCard id={podcastId} />
          </div>

          <div className="podcast-detail-right">
            <PodcastEpisodePlayer episode={episode} />
          </div>
        </div>
      </section>
    </>
  );
}

export default EpisodePlayerPage;
