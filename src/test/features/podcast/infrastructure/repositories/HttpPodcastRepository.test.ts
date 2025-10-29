import { getConfig } from '@/app/config/loadConfig';
import { makePodcastApi } from '@/features/podcast/api/podcast.api';
import { FetchHttpClient } from '@/core/api/FetchHttpClient';
import type { ITunesFeedResponse } from '@/features/podcast/api/itunes';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';

describe('Podcast API integration', () => {
  const { ITUNES_URL, LIMIT, GENRE } = getConfig();
  const http = new FetchHttpClient(ITUNES_URL);
  const api = makePodcastApi(http);

  it('should fetch podcasts from the iTunes API', async () => {
    const data = await api.list(LIMIT, GENRE);

    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);

    const first = data[0];
console.log({first});
    expect(first).toHaveProperty('id');
    expect(first).toHaveProperty('name');
    expect(first).toHaveProperty('author');
    expect(first).toHaveProperty('imageUrl');
    expect(first.imageUrl.startsWith('http')).toBe(true);
    expect(first).toHaveProperty('date');
  }, 10*1_000);
});
