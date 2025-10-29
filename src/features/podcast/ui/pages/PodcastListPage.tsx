import { useLoaderData, Link } from 'react-router-dom';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';

type LoaderData = { items: Podcast[] };

function PodcastListPage() {
  const { items } = useLoaderData() as LoaderData;

  return (
    <section>
      <h2>Podcasts</h2>
      <ul className="grid">
        {items.map((p) => (
          <li key={p.id} className="card">
            <Link to={`/podcast/${p.id}`}>
              <img src={p.imageUrl} alt={p.name ?? 'Podcast'} width={64} height={64} />
              <div>
                <strong>{p.name}</strong>
                <div>{p.author}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PodcastListPage;
