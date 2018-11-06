import {Entity, model, property} from '@loopback/repository';

@model()
export class Posts extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  _id?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  categories?: string[];

  constructor(data?: Partial<Posts>) {
    super(data);
  }
}
