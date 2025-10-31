import { NavLink } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import styles from './PodcastCard.module.css';

function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <NavLink key={podcast.id} to={`/podcast/${podcast.id}`} className={({ isActive }) => `${styles.podcast_card} ${isActive ? styles.selected : ''}`}>
      <img src={podcast.imageUrl} alt={podcast.name} width={120} height={120} loading="lazy" />
      <div className={styles.meta}>
        <div className={styles.name}>{podcast.name}</div>
        <div className={styles.author}>Author: {podcast.author}</div>
      </div>
    </NavLink>
  );
}

export default PodcastCard;
