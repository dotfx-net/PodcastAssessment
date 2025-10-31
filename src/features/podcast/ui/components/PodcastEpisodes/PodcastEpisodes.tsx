import { Link } from 'react-router';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import { getConfig } from '@/app/config/loadConfig';
import { formatDuration } from '@/shared/utils/formatDuration';
import styles from './PodcastEpisodes.module.css';

function PodcastEpisodes({ podcastId, episodes }: { podcastId: string, episodes: Episode[] }) {
  const config = getConfig();

  return (
    <section className={styles.episodes_table} role="table" data-testid="episodes-table">
      <div className={styles.episodes_table_header} role="row">
        <span role="columnheader">Title</span>
        <span role="columnheader" className={styles.episode_date_col}>Date</span>
        <span role="columnheader" className={styles.episode_duration_col}>Duration</span>
      </div>

      {episodes.map((episode) => {
        const date = new Intl.DateTimeFormat(config.INTL_FORMAT).format(new Date(episode.date));

        return (
          <Link key={episode.id} to={`/podcast/${podcastId}/episode/${episode.id}`} className={styles.episode_row} role="row" data-testid="episode-row">
            <strong className={styles.episode_title}>{episode.title}</strong>
            <span className={`${styles.episode_date} ${styles.episode_date_col}`}>{date}</span>
            <span className={`${styles.episode_duration} ${styles.episode_duration_col}`}>{!!episode.duration ? formatDuration(episode.duration / 1_000) : '-'}</span>
          </Link>
        );
      })}
    </section>
  );
}

export default PodcastEpisodes;
