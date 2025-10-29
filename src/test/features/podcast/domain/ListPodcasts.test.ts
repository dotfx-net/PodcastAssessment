import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { PodcastRepository } from '@/features/podcast/domain/ports/PodcastRepository';
import { ListPodcasts } from '@/features/podcast/domain/usecases/ListPodcasts';

class HardcodedPodcastRepository implements PodcastRepository {
  constructor(private readonly data: Podcast[] = []) {}

  async list(limit: number): Promise<Podcast[]> {
    return this.data.slice(0, limit);
  }

  async listEpisodes(podcastId: string): Promise<Episode[]> {
    return [];
  }
};

describe('ListPodcasts use case', () => {
  it('should return the available podcasts taking in consideration the specified limit', async () => {
    const podcasts = [
      new Podcast('1', 'Podcast1', 'Author1', 'img1.jpg', '2025-10-21T14:00:00-07:00', 'summary1'),
      new Podcast('2', 'Podcast2', 'Author2', 'img2.jpg', '2025-10-21T15:00:00-07:00', 'summary2'),
      new Podcast('3', 'Podcast3', 'Author3', 'img3.jpg', '2025-10-21T16:00:00-07:00', 'summary3'),
    ];

    const repo = new HardcodedPodcastRepository(podcasts);
    const useCase = new ListPodcasts(repo);

    const result = await useCase.exec(2);

    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Podcast1');
    expect(result[1].name).toBe('Podcast2');
  });
});
