import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
} from '@loopback/rest';
import {CategoriesPost, Posts} from '../models';
import {CategoriesPostRepository} from '../repositories';

export class CategoryController {
  constructor(
    @repository(CategoriesPostRepository)
    public categoriesPostRepository: CategoriesPostRepository,
  ) {}

  @post('/categories-posts', {
    responses: {
      '200': {
        description: 'CategoriesPost model instance',
        content: {'application/json': {'x-ts-type': CategoriesPost}},
      },
    },
  })
  async create(
    @requestBody() categoriesPost: CategoriesPost,
  ): Promise<CategoriesPost> {
    return await this.categoriesPostRepository.create(categoriesPost);
  }

  @get('/categories-posts/count', {
    responses: {
      '200': {
        description: 'CategoriesPost model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(CategoriesPost))
    where?: Where,
  ): Promise<Count> {
    return await this.categoriesPostRepository.count(where);
  }

  @get('/categories-posts', {
    responses: {
      '200': {
        description: 'Array of CategoriesPost model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': CategoriesPost}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(CategoriesPost))
    filter?: Filter,
  ): Promise<CategoriesPost[]> {
    return await this.categoriesPostRepository.find(filter);
  }

  @patch('/categories-posts', {
    responses: {
      '200': {
        description: 'CategoriesPost PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() categoriesPost: CategoriesPost,
    @param.query.object('where', getWhereSchemaFor(CategoriesPost))
    where?: Where,
  ): Promise<Count> {
    return await this.categoriesPostRepository.updateAll(categoriesPost, where);
  }

  @get('/categories-posts/{id}', {
    responses: {
      '200': {
        description: 'CategoriesPost model instance',
        content: {'application/json': {'x-ts-type': CategoriesPost}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<CategoriesPost> {
    return await this.categoriesPostRepository.findById(id);
  }

  @patch('/categories-posts/{id}', {
    responses: {
      '204': {
        description: 'CategoriesPost PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody() categoriesPost: CategoriesPost,
  ): Promise<void> {
    await this.categoriesPostRepository.updateById(id, categoriesPost);
  }

  @del('/categories-posts/{id}', {
    responses: {
      '204': {
        description: 'CategoriesPost DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.categoriesPostRepository.deleteById(id);
  }

  @get('/api/categories/{categories}/posts')
  async postsCategories(
    @param.path.string('categories')
    categories: typeof CategoriesPost.prototype._id,
    @param.query.object('filter', getFilterSchemaFor(Posts)) filter: Filter,
  ): Promise<Posts[]> {
    return await this.categoriesPostRepository.posts(categories).find();
  }
}
