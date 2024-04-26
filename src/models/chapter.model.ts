import {Entity, model, property} from '@loopback/repository';

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
    type: 'string',
    required: true,
  })
  studioId: string;

  @property({
    type: 'string',
    required: true,
  })
  animeId: string;

  @property({
    type: 'number',
    required: true,
  })
  duration: number;


  constructor(data?: Partial<Chapter>) {
    super(data);
  }
}

export interface ChapterRelations {
  // describe navigational properties here
}

export type ChapterWithRelations = Chapter & ChapterRelations;
