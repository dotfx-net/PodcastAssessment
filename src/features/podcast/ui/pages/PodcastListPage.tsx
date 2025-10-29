import { useLoaderData, Link } from 'react-router-dom';
import { Suspense, useState, useMemo, useRef, useDeferredValue, use } from 'react';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { usePodcastStore } from '@/features/podcast/store/podcast.store';

type LoaderData = { items: Promise<Podcast[]> };

const toLower = (s: string) => (s || '').toLowerCase();

const matches = (p: Podcast, q: string) => {
  const n = toLower(p.name ?? '');
  const a = toLower(p.author ?? '');

  return n.includes(q) || a.includes(q);
};

function PodcastList({ itemsPromise }: { itemsPromise: Promise<Podcast[]>;}) {
  const items = use(itemsPromise);
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const q = toLower(query.trim());
  const loading = usePodcastStore((s) => s.loading);
  const filtered = useMemo(
    () => (q !== '' ? items.filter((p) => matches(p, q)) : items),
    [items, q]
  );

  return (
    <>
      <div className="podcast-search">
        <div className="podcast-count">{filtered.length}</div>
        <input
          ref={inputRef}
          type="search"
          placeholder="Search by name or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="podcast-grid">
        {filtered.map((p) => (
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
