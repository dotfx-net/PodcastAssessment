import { Link } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import styles from './PodcastCard.module.css';

function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Link key={podcast.id} to={`/podcast/${podcast.id}`} className={styles.podcast_card}>
      <img src={podcast.imageUrl} alt={podcast.name} width={120} height={120} />
      <div className={styles.meta}>
        <div className={styles.name}>{podcast.name}</div>
        <div className={styles.author}>Author: {podcast.author}</div>
      </div>
    </Link>
  );
}

export default PodcastCard;
