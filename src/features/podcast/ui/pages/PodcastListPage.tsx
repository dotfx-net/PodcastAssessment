import { useLoaderData, Link } from 'react-router-dom';
import { Suspense } from 'react';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';

type LoaderData = { items: Promise<Podcast[]> };

function PodcastListPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <section>
      <h2>Podcasts</h2>
      <Suspense fallback={<p>Loading podcasts...</p>}>
        {data.items.then((items) => (
          <div className="podcast-grid">
            {items.map((p) => (
              <div key={p.id} className="podcast-card">
                <Link to={`/podcast/${p.id}`}>
                  <img src={p.imageUrl} alt={p.name ?? 'Podcast'} width={120} height={120} />
                  <div className="meta">
                    <div className="name">{p.name}</div>
                    <div className="author">{p.author}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </Suspense>
    </section>
  );
}

export default PodcastListPage;
