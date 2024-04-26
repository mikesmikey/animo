import {Entity, model, property} from '@loopback/repository';
import uuid from 'uuid';

@model()
export class Chapter extends Entity {
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
  duration: number;

  @property({
    type: 'string',
  })
  animeId: string | null;

  @property({
    type: 'string',
  })
  studioId: string | null;

  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}

export interface ChapterRelations {
  // describe navigational properties here
}

export type ChapterWithRelations = Chapter & ChapterRelations;
