import { Suspense, use, useMemo } from 'react';
import { useLoaderData, useParams } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import { PodcastSummaryCard } from '@/features/podcast/ui/components/PodcastSummaryCard';
import DOMPurify from 'dompurify';

type LoaderData = {
  list: Promise<Podcast[]>;
  episodes: Promise<Episode[]>;
};

function PodcastEpisodePlayer({ episode }: { episode: Episode }) {
  const allowedTags = [
    'p', 'br', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'del',
    'blockquote', 'pre', 'code',
    'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'a', 'img',
    'table', 'thead', 'tbody', 'tr', 'th', 'td'
  ];

  const allowedAttrs = [
    'href',
    'target', 'rel',
    'title',
    'src', 'alt',
    'colspan', 'rowspan',
    'class', 
    'data-type', 'data-id', 'data-level'
  ];

  const sanitized = DOMPurify.sanitize(episode.description.replace(/\r?\n/g, '<br />'), {
    ALLOWED_TAGS: allowedTags,
    ALLOWED_ATTR: allowedAttrs
  });

  return (
    <div className="episode-player">
      <h2>{episode.title}</h2>
      <div className="description" dangerouslySetInnerHTML={{ __html: sanitized }} />
      <hr />
      <audio controls src={episode.audioUrl} />
    </div>
  );
}

function PodcastEpisodeDetail({ data, podcastId, episodeId }: { data: LoaderData; podcastId: string; episodeId: string; }) {
  const list = use(data.list);
  const episodes = use(data.episodes);
  const podcast = useMemo(() => list.find((p) => p.id === podcastId), [list, podcastId]);
  const episode = useMemo(() => episodes.find((e) => e.id === episodeId), [episodes, episodeId]);

  if (!podcast) { throw new Error('Podcast Id not found'); }
  if (!episodes.length) { throw new Error('Podcast is empty'); }
  if (!episode) { throw new Error('Episode not found'); }

  return (
    <div className="podcast-detail-layout">
      <div className="podcast-detail-left">
        <PodcastSummaryCard id={podcastId} />
      </div>

      <div className="podcast-detail-right">
        <PodcastEpisodePlayer episode={episode} />
      </div>
    </div>
  );
}

function EpisodePlayerPage() {
  const { podcastId = '', episodeId = '' } = useParams();
  const data = useLoaderData() as LoaderData;

  return (
    <section>
      <Suspense fallback={<h2>Loading podcast episode...</h2>}>
        <PodcastEpisodeDetail data={data} podcastId={podcastId} episodeId={episodeId} />
      </Suspense>
    </section>
  );
}

export default EpisodePlayerPage;
