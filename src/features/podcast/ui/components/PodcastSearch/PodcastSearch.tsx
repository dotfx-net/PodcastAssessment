import { useState, useEffect, useRef, Dispatch, SetStateAction, type ChangeEvent } from 'react';
import styles from './PodcastSearch.module.css';

function PodcastSearch({ loading, setQuery }: { loading: boolean, setQuery: Dispatch<SetStateAction<string>> }) {
  const [search, setSearch] = useState('');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSearch(value);

    if (!!timeoutRef.current) { clearTimeout(timeoutRef.current); }

    timeoutRef.current = setTimeout(() => setQuery(value), 150);
  };

  useEffect(() => {
    return () => {
      if (!!timeoutRef.current) { clearTimeout(timeoutRef.current); }
    };
  }, []);

  return (
    <div className={styles.podcast_search}>
      <input
        type="search"
        placeholder="Search by name or author..."
        value={search}
        onChange={handleChange}
        disabled={loading}
        data-testid="podcast-search"
      />
    </div>
  );
}

export default PodcastSearch;
