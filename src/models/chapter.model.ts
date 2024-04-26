import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Anime} from './anime.model';
import {Studio} from './studio.model';

@model()
export class Chapter extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;
  @property({
    type: 'number',
    required: true,
  })
  duration: number;

  @belongsTo(() => Anime)
  animeId: string;

  @belongsTo(() => Studio)
  studioId: string;

  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}

export interface ChapterRelations {
  // describe navigational properties here
}

export type ChapterWithRelations = Chapter & ChapterRelations;
