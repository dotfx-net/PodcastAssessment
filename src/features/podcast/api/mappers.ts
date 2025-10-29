import { Podcast } from '../domain/entities/Podcast';
import { Episode } from '../domain/entities/Episode';
import type { PodcastDTO, EpisodeDTO } from './podcast.api';

export const toPodcastEntity = (dto: PodcastDTO): Podcast => new Podcast(dto.id, dto.name, dto.author, dto.imageUrl, dto.date, dto.summary);
export const toEpisodeEntity = (dto: EpisodeDTO): Episode => new Episode(dto.id, dto.title, dto.duration, dto.date, dto.description, dto.audioUrl);
