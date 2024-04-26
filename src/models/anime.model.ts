import {Entity, model, property} from '@loopback/repository';
import uuid from 'uuid';

@model()
export class Anime extends Entity {
  @property({
    type: 'string',
    id: true,
    defaultFn: "uuid",
    validator: (value: string) => {
      if (!uuid.validate(value))
        throw new Error('Invalid id format (must be in UUID format)')
    }
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

  @property({
    type: 'string',
  })
  studioId: string | null;

  constructor(data?: Partial<Anime>) {
    super(data);
  }
}

export interface AnimeRelations {
  // describe navigational properties here
}

export type AnimeWithRelations = Anime & AnimeRelations;
