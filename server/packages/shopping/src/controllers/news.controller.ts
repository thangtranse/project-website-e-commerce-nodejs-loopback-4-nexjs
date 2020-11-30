import {
  authenticate
} from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import { News } from '../models';
import { NewsRepository } from '../repositories';
import { basicAuthorization } from '../services/basic.authorizor';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

export class NewsController {
  constructor(
    @repository(NewsRepository)
    public newsRepository: NewsRepository,
  ) { }

  @post('/news', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'News model instance',
        content: { 'application/json': { schema: getModelSchemaRef(News) } },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, {
            title: 'NewNews',
            exclude: ['NewsId'],
          }),
        },
      },
    })
    news: Omit<News, 'id'>,
  ): Promise<News> {
    return this.newsRepository.create(news);
  }

  @get('/news/count', {
    responses: {
      '200': {
        description: 'News model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.count(where);
  }

  @get('/news', {
    responses: {
      '200': {
        description: 'Array of News model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(News, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(News) filter?: Filter<News>,
  ): Promise<News[]> {
    return this.newsRepository.find(filter);
  }

  @patch('/news', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'News PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, { partial: true }),
        },
      },
    })
    news: News,
    @param.where(News) where?: Where<News>,
  ): Promise<Count> {
    return this.newsRepository.updateAll(news, where);
  }

  @get('/news/{id}', {
    responses: {
      '200': {
        description: 'News model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(News, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(News, { exclude: 'where' }) filter?: FilterExcludingWhere<News>
  ): Promise<News> {
    return this.newsRepository.findById(id, filter);
  }

  @patch('/news/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'News PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(News, { partial: true }),
        },
      },
    })
    news: News,
  ): Promise<void> {
    await this.newsRepository.updateById(id, news);
  }

  @put('/news/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'News PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() news: News,
  ): Promise<void> {
    await this.newsRepository.replaceById(id, news);
  }

  @del('/news/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'News DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.newsRepository.deleteById(id);
  }

  @get('/news/slug/{slug}', {
    responses: {
      '200': {
        description: 'Lấy nội dung News qua SLUG',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(News, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findSlug(
    @param.path.string('slug') slug: string
  ): Promise<News[]> {
    return this.newsRepository.find({ where: { slug } });
  }

  @get('/news/getFields', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Trả về các Fields',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              items: {},
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  @authorize({
    allowedRoles: ['admin'],
    voters: [basicAuthorization],
  })
  async getFields(): Promise<{}> {
    const schema = News.definition
    return schema.properties;
  }



}
