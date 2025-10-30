import { render, screen } from '@testing-library/react';
import { Podcast } from '@/features/podcast/domain/entities/Podcast';
import { PodcastSummaryCard } from '@/features/podcast/ui/components/PodcastSummaryCard';
import { usePodcastStore } from '@/features/podcast/application/store/podcast.store';

// Mock the store
jest.mock('@/features/podcast/application/store/podcast.store');

describe('PodcastSummaryCard test', () => {
  const mockPodcast = new Podcast('1', 'Podcast1', 'Author1', 'img1.jpg', '2025-10-21T14:00:00-07:00', 'summary1');
  const mockGetPodcastById = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetPodcastById.mockReturnValue(mockPodcast);
    (usePodcastStore as unknown as jest.Mock).mockReturnValue(mockGetPodcastById);
  });

  it('should render the podcast name', () => {
    render(<PodcastSummaryCard id="1" />);

    const nameElement = screen.getByRole('heading', { name: 'Podcast1', level: 3 });

    expect(nameElement).toBeDefined();
  });

  it('should render the podcast author', () => {
    render(<PodcastSummaryCard id="1" />);

    const authorElement = screen.getByText('by Author1');

    expect(authorElement).toBeDefined();
  });

  it('should render the podcast image with correct attributes', () => {
    render(<PodcastSummaryCard id="1" />);

    const imageElement = screen.getByRole('img', { name: 'Podcast1' });

    expect(imageElement).toBeDefined();
    expect(imageElement).toHaveAttribute('src', 'img1.jpg');
    expect(imageElement).toHaveAttribute('width', '120');
    expect(imageElement).toHaveAttribute('height', '120');
  });

  it('should render the description heading', () => {
    render(<PodcastSummaryCard id="1" />);

    const descriptionHeading = screen.getByRole('heading', { name: 'Description:', level: 5 });

    expect(descriptionHeading).toBeDefined();
  });

  it('should render the podcast summary', () => {
    render(<PodcastSummaryCard id="1" />);

    const summaryElement = screen.getByText('summary1');

    expect(summaryElement).toBeDefined();
  });

  it('should call getPodcastById with the correct id', () => {
    render(<PodcastSummaryCard id="1" />);

    expect(mockGetPodcastById).toHaveBeenCalledWith('1');
  });

  it('should retrieve podcast from store on render', () => {
    render(<PodcastSummaryCard id="1" />);

    expect(usePodcastStore).toHaveBeenCalled();
    expect(mockGetPodcastById).toHaveBeenCalledTimes(1);
  });
});
