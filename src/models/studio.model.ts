import {Entity, model, property} from '@loopback/repository';
import uuid from 'uuid';

@model()
export class Studio extends Entity {
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
    type: 'string',
    required: true,
  })
  website: string;


  constructor(data?: Partial<Studio>) {
    super(data);
  }
}

export interface StudioRelations {
  // describe navigational properties here
}

export type StudioWithRelations = Studio & StudioRelations;
