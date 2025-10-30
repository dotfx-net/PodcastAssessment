import DOMPurify from 'dompurify';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import styles from './PodcastEpisodePlayer.module.css';

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
    <section className={styles.episode_player}>
      <h2>{episode.title}</h2>
      <div className={styles.episode_description} dangerouslySetInnerHTML={{ __html: sanitized }} />
      <hr />
      <audio controls src={episode.audioUrl} data-testid="audio" />
    </section>
  );
}

export default PodcastEpisodePlayer;
