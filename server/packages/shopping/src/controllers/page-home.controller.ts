/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-misused-promises */
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
import {PageHome} from '../models';
import {NewsRepository, PageHomeRepository, ProductRepository} from '../repositories';

export class PageHomeController {
  constructor(
    @repository(PageHomeRepository)
    public pageHomeRepository: PageHomeRepository,

    @repository(ProductRepository)
    public productRepository: ProductRepository,

    @repository(NewsRepository)
    public newsRepository: NewsRepository,
  ) {}

  @post('/page-homes', {
    responses: {
      '200': {
        description: 'PageHome model instance',
        content: {'application/json': {schema: getModelSchemaRef(PageHome)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PageHome, {
            title: 'NewPageHome',
            exclude: ['key'],
          }),
        },
      },
    })
    pageHome: Omit<PageHome, 'key'>,
  ): Promise<PageHome> {
    return this.pageHomeRepository.create(pageHome);
  }

  @get('/page-homes/count', {
    responses: {
      '200': {
        description: 'PageHome model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(PageHome) where?: Where<PageHome>,
  ): Promise<Count> {
    return this.pageHomeRepository.count(where);
  }

  @get('/page-homes', {
    responses: {
      '200': {
        description: 'Array of PageHome model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PageHome, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PageHome) filter?: Filter<PageHome>,
  ): Promise<PageHome[]> {
    return this.pageHomeRepository.find(filter);
  }

  @patch('/page-homes', {
    responses: {
      '200': {
        description: 'PageHome PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PageHome, {partial: true}),
        },
      },
    })
    pageHome: PageHome,
    @param.where(PageHome) where?: Where<PageHome>,
  ): Promise<Count> {
    return this.pageHomeRepository.updateAll(pageHome, where);
  }

  @get('/page-homes/{id}', {
    responses: {
      '200': {
        description: 'PageHome model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PageHome, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PageHome, {exclude: 'where'}) filter?: FilterExcludingWhere<PageHome>
  ): Promise<PageHome> {
    return this.pageHomeRepository.findById(id, filter);
  }

  @patch('/page-homes/{id}', {
    responses: {
      '204': {
        description: 'PageHome PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PageHome, {partial: true}),
        },
      },
    })
    pageHome: PageHome,
  ): Promise<void> {
    await this.pageHomeRepository.updateById(id, pageHome);
  }

  @put('/page-homes/{id}', {
    responses: {
      '204': {
        description: 'PageHome PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pageHome: PageHome,
  ): Promise<void> {
    await this.pageHomeRepository.replaceById(id, pageHome);
  }

  @del('/page-homes/{id}', {
    responses: {
      '204': {
        description: 'PageHome DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pageHomeRepository.deleteById(id);
  }
}
