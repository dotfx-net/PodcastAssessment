import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Episode } from '@/features/podcast/domain/entities/Episode';
import { PodcastEpisodePlayer } from '@/features/podcast/ui/components/PodcastEpisodePlayer';

describe('PodcastEpisodePlayer test', () => {
  const episode = new Episode('1', 'Episode1', 10000, '2025-10-21T14:00:00-07:00', 'description1', 'https://url/audio1.mp3');

  beforeEach(() => {
    render(
      <MemoryRouter>
        <PodcastEpisodePlayer episode={episode} />
      </MemoryRouter>
    );
  });

  it('should render the episode title', () => {
    const titleElement = screen.getByText('Episode1');

    expect(titleElement).toBeDefined();
  });

  it('should render the episode description', () => {
    const descriptionElement = screen.getByText('description1');

    expect(descriptionElement).toBeDefined();
  });

  it('should render the podcast audio player and its attributes', () => {
    const audioElement = screen.getByTestId('audio');

    expect(audioElement).toBeDefined();
    expect(audioElement).toHaveAttribute('src', 'https://url/audio1.mp3');
    expect(audioElement).toHaveAttribute('controls', '');
  });
});
