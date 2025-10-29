import { Suspense, use, useMemo } from 'react';
import { useLoaderData, Link, useParams } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import PodcastSummaryCard from '@/features/podcast/ui/components/PodcastSummaryCard';

type LoaderData = {
  list: Promise<Podcast[]>;
  episodes: Promise<Episode[]>;
};

function formatDuration(sec: number) {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  const hh = h.toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');

  return `${h > 0 ? hh + ':' : ''}${mm}:${ss}`;
}

function PodcastEpisodes({ data, podcastId }: { data: LoaderData; podcastId: string }) {
  const list = use(data.list);
  const episodes = use(data.episodes);
  const podcast = useMemo(() => list.find((p) => p.id === podcastId), [list, podcastId]);

  if (!podcast) { throw new Error('Podcast Id not found'); }
  if (!episodes.length) { throw new Error('Podcast is empty'); }

  return (
    <div className="podcast-detail-layout">
      <div className="podcast-detail-left">
        <PodcastSummaryCard id={podcastId} />
      </div>

      <div className="podcast-detail-right">
        <div className="episodes-count">
          <h3>Episodes: {episodes.length}</h3>
        </div>

        <div className="episodes-table" role="table">
          <div className="episodes-table-header" role="row">
            <span role="columnheader">Title</span>
            <span role="columnheader" className="episode-date-col">Date</span>
            <span role="columnheader" className="episode-duration-col">Duration</span>
          </div>

          {episodes.map((episode) => {
            const date = new Intl.DateTimeFormat('en-US').format(new Date(episode.date));

            return (
              <Link key={episode.id} to={`/podcast/${podcastId}/episode/${episode.id}`} className="episode-row" role="row">
                <strong className="episode-title">{episode.title}</strong>
                <span className="episode-date episode-date-col">{date}</span>
                <span className="episode-duration episode-duration-col">{formatDuration(episode.duration / 1_000)}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PodcastDetailPage() {
  const { podcastId = '' } = useParams();
  const data = useLoaderData() as LoaderData;

  return (
    <section>
      <Suspense fallback={<h2>Loading podcast...</h2>}>
        <PodcastEpisodes data={data} podcastId={podcastId} />
      </Suspense>
    </section>
  );
}

export default PodcastDetailPage;
