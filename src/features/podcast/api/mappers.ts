import { Podcast } from '../domain/entities/Podcast';
import type { PodcastDTO } from './podcast.api';

export const toPodcastEntity = (dto: PodcastDTO): Podcast => new Podcast(dto.id, dto.name, dto.author, dto.imageUrl, dto.date);
