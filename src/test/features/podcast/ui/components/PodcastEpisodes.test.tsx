import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import { PodcastEpisodes } from '@/features/podcast/ui/components/PodcastEpisodes';

describe('PodcastEpisodes test', () => {
  const podcast = new Podcast('1', 'Podcast1', 'Author1', 'img1.jpg', '2025-10-21T14:00:00-07:00', 'summary1');
  const episodes = [
    new Episode('1', 'Episode1', 10000, '2025-10-21T14:00:00-07:00', 'description1', 'https://url/audio1.mp3'),
    new Episode('2', 'Episode2', 10000, '2025-10-21T15:00:00-07:00', 'description2', 'https://url/audio2.mp3')
  ] as Episode[];

  beforeEach(() => {
    render(
      <MemoryRouter>
        <PodcastEpisodes podcastId={podcast.id} episodes={episodes} />
      </MemoryRouter>
    );
  });

  it('should render the links to episodes', () => {
    const rowElements = screen.getAllByRole('row');
    const episodeRows = rowElements.filter((row) => row.tagName === 'A'); // filter out the header row (the div with class "episodes_table_header")

    expect(episodeRows).toHaveLength(2);
    expect(episodeRows[0]).toHaveAttribute('href', '/podcast/1/episode/1');
    expect(episodeRows[1]).toHaveAttribute('href', '/podcast/1/episode/2');
  });

  it('should render the episode1 title', () => {
    const titleElement = screen.getByText('Episode1');

    expect(titleElement).toBeDefined();
  });
});
