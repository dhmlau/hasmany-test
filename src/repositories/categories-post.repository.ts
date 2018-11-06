import {
  DefaultCrudRepository,
  juggler,
  HasManyRepositoryFactory,
  repository,
} from '@loopback/repository';
import {CategoriesPost, Posts} from '../models';
import {DsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PostsRepository} from './posts.repository';

export class CategoriesPostRepository extends DefaultCrudRepository<
  CategoriesPost,
  typeof CategoriesPost.prototype._id
> {
  public readonly posts: HasManyRepositoryFactory<
    Posts,
    typeof CategoriesPost.prototype._id
  >;

  constructor(
    @inject('datasources.ds') dataSource: DsDataSource,
    @repository.getter(PostsRepository)
    getPostsRepository: Getter<PostsRepository>,
  ) {
    super(CategoriesPost, dataSource);
    this.posts = this._createHasManyRepositoryFactoryFor(
      'posts',
      getPostsRepository,
    );
  }
}
