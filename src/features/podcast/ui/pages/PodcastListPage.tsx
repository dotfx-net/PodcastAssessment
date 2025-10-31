import { useState, useMemo } from 'react';
import { usePodcasts } from '@/features/podcast/ui/hooks/usePodcasts';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { PodcastCard } from '@/features/podcast/ui/components/PodcastCard';
import { PodcastSearch } from '@/features/podcast/ui/components/PodcastSearch';

const toLower = (s: string) => (s || '').toLowerCase();

const matches = (p: Podcast, q: string) => {
  const n = toLower(p.name ?? '');
  const a = toLower(p.author ?? '');

  return n.includes(q) || a.includes(q);
};

function PodcastListPage() {
  const { items, listUpdatedAt, loading } = usePodcasts();
  const [query, setQuery] = useState('');
  const q = toLower(query.trim());
  const filtered = useMemo(
    () => (q !== '' ? items.filter((p) => matches(p, q)) : items),
    [items, q]
  );

  if ((loading || listUpdatedAt === null) && !items.length) {
    return (
      <section>
        <h2>Loading podcasts...</h2>
      </section>
    );
  }

  return (
    <>
      <title>Podcasts</title>

      <section>
        <div className="podcast-search">
          <div className="podcast-count">{filtered.length}</div>
          <PodcastSearch loading={loading} setQuery={setQuery} />
        </div>

        <div className="podcast-grid">
          {filtered.map((p) => (
            <PodcastCard key={p.id} podcast={p} />
          ))}
        </div>
      </section>
    </>
  );
}

export default PodcastListPage;
