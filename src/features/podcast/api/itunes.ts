export type ITunesTopPodcastsEntryImage = {
  label: string;
  attributes?: { height?: string };
};

export type ITunesTopPodcastsEntry = {
  ['im:name']: { label: string };
  ['im:image']: ITunesTopPodcastsEntryImage[];
  summary?: { label: string };
  title: { label: string };
  link: { attributes: { href: string } };
  id: { label: string; attributes: { ['im:id']: string } };
  ['im:artist']: { label: string };
  category?: { attributes?: { term?: string; label?: string } };
  ['im:releaseDate']?: { label: string; attributes?: { label?: string } };
};

export type ITunesTopPodcastsFeedResponse = {
  feed?: { entry?: ITunesEntry[] };
};

export type ITunesPodcastEpisode = {
  wrapperType: 'track' | 'podcastEpisode';
  collectionId?: number;
  trackId: string;
  trackName: string;
  releaseDate: string;
  description: string;
  trackTimeMillis?: number;
  episodeUrl?: string;
};

export type ITunesPodcastFeedResponse = {
  resultCount?: number;
  results?: ITunesPodcastEpisode[];
};
