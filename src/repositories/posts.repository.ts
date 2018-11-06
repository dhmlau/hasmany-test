import {DefaultCrudRepository, juggler} from '@loopback/repository';
import {Posts} from '../models';
import {DsDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PostsRepository extends DefaultCrudRepository<
  Posts,
  typeof Posts.prototype._id
> {
  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
  ) {
    super(Posts, dataSource);
  }
}
