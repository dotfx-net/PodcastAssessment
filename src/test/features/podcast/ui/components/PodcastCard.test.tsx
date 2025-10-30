import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { PodcastCard } from '@/features/podcast/ui/components/PodcastCard';

describe('PodcastCard test', () => {
  const podcast = new Podcast('1', 'Podcast1', 'Author1', 'img1.jpg', '2025-10-21T14:00:00-07:00', 'summary1');

  beforeEach(() => {
    render(
      <MemoryRouter>
        <PodcastCard podcast={podcast} />
      </MemoryRouter>
    );
  });

  it('should render the link with the details URL', () => {
    const linkElement = screen.getByRole('link');

    expect(linkElement).toHaveAttribute('href', '/podcast/1');
  });

  it('should render the podcast name', () => {
    const nameElement = screen.getByText('Podcast1');

    expect(nameElement).toBeDefined();
  });

  it('should render the podcast author', () => {
    const authorElement = screen.getByText('Author: Author1');

    expect(authorElement).toBeDefined();
  });

  it('should render the podcast image and its attributes', () => {
    const imageElement = screen.getByRole('img');

    expect(imageElement).toBeDefined();
    expect(imageElement).toHaveAttribute('src', 'img1.jpg');
    expect(imageElement).toHaveAttribute('width', '120');
    expect(imageElement).toHaveAttribute('height', '120');
  });
});
