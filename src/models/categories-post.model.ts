import {Entity, model, property, hasMany} from '@loopback/repository';
import {Posts} from '.';

@model()
export class CategoriesPost extends Entity {
  @property({
    type: 'string',
    id: true,
    required: true,
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  key: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  _v: number;

  @hasMany(() => Posts, {keyTo: 'categories'})
  posts?: Posts[];

  constructor(data?: Partial<CategoriesPost>) {
    super(data);
  }
}
