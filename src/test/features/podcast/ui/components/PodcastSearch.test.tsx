import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PodcastSearch } from '@/features/podcast/ui/components/PodcastSearch';

describe('PodcastSearch test', () => {
  const mockSetQuery = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the search input', () => {
    render(<PodcastSearch loading={false} setQuery={mockSetQuery} />);

    const inputElement = screen.getByRole('searchbox');

    expect(inputElement).toBeDefined();
    expect(inputElement).toHaveAttribute('type', 'search');
  });

  it('should update the input value when typing', async () => {
    const user = userEvent.setup();

    render(<PodcastSearch loading={false} setQuery={mockSetQuery} />);

    const inputElement = screen.getByRole('searchbox');

    await user.type(inputElement, 'test');

    expect(inputElement).toHaveValue('test');
  });

  it('should call setQuery with debounced value after 300ms', async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ delay: null });

    render(<PodcastSearch loading={false} setQuery={mockSetQuery} />);

    const inputElement = screen.getByRole('searchbox');

    await user.type(inputElement, 'podcast');

    expect(mockSetQuery).not.toHaveBeenCalled();

    jest.advanceTimersByTime(300);

    expect(mockSetQuery).toHaveBeenCalledWith('podcast');
    expect(mockSetQuery).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });

  it('should disable the input when loading is true', () => {
    render(<PodcastSearch loading={true} setQuery={mockSetQuery} />);

    const inputElement = screen.getByRole('searchbox');

    expect(inputElement).toBeDisabled();
  });

  it('should enable the input when loading is false', () => {
    render(<PodcastSearch loading={false} setQuery={mockSetQuery} />);

    const inputElement = screen.getByRole('searchbox');

    expect(inputElement).not.toBeDisabled();
  });

  it('should clear timeout on unmount', async () => {
    jest.useFakeTimers();

    const user = userEvent.setup({ delay: null });
    const { unmount } = render(<PodcastSearch loading={false} setQuery={mockSetQuery} />);
    const inputElement = screen.getByRole('searchbox');

    await user.type(inputElement, 'test');

    unmount();

    jest.advanceTimersByTime(300); // if cleanup worked, setQuery should not be called
    expect(mockSetQuery).not.toHaveBeenCalled();

    jest.useRealTimers();
  });
});
