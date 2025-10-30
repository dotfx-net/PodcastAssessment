import { Suspense, useState, useMemo, use } from 'react';
import { useLoaderData } from 'react-router';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { usePodcastStore } from '@/features/podcast/application/store/podcast.store';
import { PodcastCard } from '@/features/podcast/ui/components/PodcastCard';
import { PodcastSearch } from '@/features/podcast/ui/components/PodcastSearch';

type LoaderData = { items: Promise<Podcast[]> };

const toLower = (s: string) => (s || '').toLowerCase();

const matches = (p: Podcast, q: string) => {
  const n = toLower(p.name ?? '');
  const a = toLower(p.author ?? '');

  return n.includes(q) || a.includes(q);
};

function PodcastListPage() {
  const data = useLoaderData() as LoaderData;
  const items = use(data.items);
  const loading = usePodcastStore((s) => s.loading);
  const [query, setQuery] = useState('');
  const q = toLower(query.trim());
  const filtered = useMemo(
    () => (q !== '' ? items.filter((p) => matches(p, q)) : items),
    [items, q]
  );

  return (
    <>
      <title>Podcasts</title>

      <section>
        <Suspense fallback={<h2>Loading podcasts...</h2>}>
          <div className="podcast-search">
            <div className="podcast-count">{filtered.length}</div>
            <PodcastSearch loading={loading} setQuery={setQuery} />
          </div>

          <div className="podcast-grid">
            {filtered.map((p) => (
              <PodcastCard key={p.id} podcast={p} />
            ))}
          </div>
        </Suspense>
      </section>
    </>
  );
}

export default PodcastListPage;
