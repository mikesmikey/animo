import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Studio} from './studio.model';

@model()
export class Anime extends Entity {
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
  year: number;

  @belongsTo(() => Studio)
  studioId: string;

  constructor(data?: Partial<Anime>) {
    super(data);
  }
}

export interface AnimeRelations {
  // describe navigational properties here
}

export type AnimeWithRelations = Anime & AnimeRelations;
