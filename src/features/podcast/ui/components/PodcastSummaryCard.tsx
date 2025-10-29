import { usePodcastStore } from '@/features/podcast/store/podcast.store';

function PodcastSummaryCard({ id }: { id: string; }) {
  const getPodcastById = usePodcastStore((s) => s.getPodcastById);
  const podcast = getPodcastById(id);

  return (
    <div className="podcast-summary-card">
      <div className="image">
        <img src={podcast.imageUrl} alt={podcast.name} width={120} height={120} />
      </div>
      <hr />
      <div className="body">
        <h3 className="name">{podcast.name}</h3>
        <i className="author">by {podcast.author}</i>
      </div>
      <hr />
      <small className="summary">{podcast.summary}</small>
    </div>
  );
}

export default PodcastSummaryCard;
