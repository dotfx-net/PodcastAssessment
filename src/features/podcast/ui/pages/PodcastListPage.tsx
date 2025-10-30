import { Suspense, useState, useMemo, useRef, useDeferredValue, use } from 'react';
import { useLoaderData, Link } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { usePodcastStore } from '@/features/podcast/store/podcast.store';
import { PodcastSearch } from '@/features/podcast/ui/components/PodcastSearch';

type LoaderData = { items: Promise<Podcast[]> };

const toLower = (s: string) => (s || '').toLowerCase();

const matches = (p: Podcast, q: string) => {
  const n = toLower(p.name ?? '');
  const a = toLower(p.author ?? '');

  return n.includes(q) || a.includes(q);
};

function PodcastCard({ podcast }: { podcast: Podcast }) {
  return (
    <Link key={podcast.id} to={`/podcast/${podcast.id}`} className="podcast-card">
      <img src={podcast.imageUrl} alt={podcast.name} width={120} height={120} />
      <div className="meta">
        <div className="name">{podcast.name}</div>
        <div className="author">Author: {podcast.author}</div>
      </div>
    </Link>
  );
}

function PodcastList({ itemsPromise }: { itemsPromise: Promise<Podcast[]>;}) {
  const items = use(itemsPromise);
  const loading = usePodcastStore((s) => s.loading);
  const [query, setQuery] = useState('');
  const q = toLower(query.trim());
  const filtered = useMemo(
    () => (q !== '' ? items.filter((p) => matches(p, q)) : items),
    [items, q]
  );

  return (
    <>
      <div className="podcast-search">
        <div className="podcast-count">{filtered.length}</div>
        <PodcastSearch loading={loading} setQuery={setQuery} />
      </div>

      <div className="podcast-grid">
        {filtered.map((p) => (
          <PodcastCard key={p.id} podcast={p} />
        ))}
      </div>
    </>
  );
}

function PodcastListPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <section>
      <Suspense fallback={<h2>Loading podcasts...</h2>}>
        <PodcastList itemsPromise={data.items} />
      </Suspense>
    </section>
  );
}

export default PodcastListPage;
