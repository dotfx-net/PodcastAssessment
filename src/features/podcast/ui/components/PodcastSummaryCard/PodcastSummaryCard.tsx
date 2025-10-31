import { usePodcastStore } from '@/features/podcast/application/store/podcast.store';
import styles from './PodcastSummaryCard.module.css';

function PodcastSummaryCard({ id }: { id: string; }) {
  const getPodcastById = usePodcastStore((s) => s.getPodcastById);
  const podcast = getPodcastById(id);

  return (
    <div className={styles.podcast_summary_card} data-testid="podcast-summary">
      <div className={styles.image}>
        <img src={podcast.imageUrl} alt={podcast.name} width={120} height={120} />
      </div>
      <hr />
      <div className="body">
        <h3 className="name">{podcast.name}</h3>
        <i className="author">by {podcast.author}</i>
      </div>
      <hr />
      <div className="description">
        <h5>Description:</h5>
        <i className="summary">{podcast.summary}</i>
      </div>
    </div>
  );
}

export default PodcastSummaryCard;
