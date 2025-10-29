export type ITunesImage = {
  label: string;
  attributes?: { height?: string };
};

export type ITunesEntry = {
  ['im:name']: { label: string };
  ['im:image']: ITunesImage[];
  summary?: { label: string };
  title: { label: string };
  link: { attributes: { href: string } };
  id: { label: string; attributes: { ['im:id']: string } };
  ['im:artist']: { label: string };
  category?: { attributes?: { term?: string; label?: string } };
  ['im:releaseDate']?: { label: string; attributes?: { label?: string } };
};

export type ITunesFeedResponse = {
  feed?: { entry?: ITunesEntry[] };
};
