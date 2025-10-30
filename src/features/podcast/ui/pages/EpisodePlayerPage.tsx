import { Suspense, use, useMemo } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import { PodcastSummaryCard } from '@/features/podcast/ui/components/PodcastSummaryCard';
import { PodcastEpisodePlayer } from '@/features/podcast/ui/components/PodcastEpisodePlayer';

type LoaderData = {
  list: Promise<Podcast[]>;
  episodes: Promise<Episode[]>;
};

function EpisodePlayerPage() {
  const { podcastId = '', episodeId = '' } = useParams();
  const data = useLoaderData() as LoaderData;
  const list = use(data.list);
  const episodes = use(data.episodes);
  const podcast = useMemo(() => list.find((p) => p.id === podcastId), [list, podcastId]);
  const episode = useMemo(() => episodes.find((e) => e.id === episodeId), [episodes, episodeId]);

  if (!podcast) { throw new Error('Podcast Id not found'); }
  if (!episodes.length) { throw new Error('Podcast is empty'); }
  if (!episode) { throw new Error('Episode not found'); }

  return (
    <>
      <title>{`Episode ${episode.id} | Podcast ${podcastId}`}</title>

      <section>
        <Suspense fallback={<h2>Loading podcast episode...</h2>}>
          <div className="podcast-detail-layout">
            <div className="podcast-detail-left">
              <PodcastSummaryCard id={podcastId} />
            </div>

            <div className="podcast-detail-right">
              <PodcastEpisodePlayer episode={episode} />
            </div>
          </div>
        </Suspense>
      </section>
    </>
  );
}

export default EpisodePlayerPage;
