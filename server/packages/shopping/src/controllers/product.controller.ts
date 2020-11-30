// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { authenticate } from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor, param,




  patch, post,






  put,

  requestBody
} from '@loopback/rest';
import { Product } from '../models';
import { ProductRepository } from '../repositories';
import {
  ListIdDeleteUser as RequestListIdDeleteList,
  ResponseDeleteUser as ResponseListIdDeleteList
} from '../repositories/user.repository';
import { basicAuthorization } from '../services/basic.authorizor';
import { OPERATION_SECURITY_SPEC } from '../utils/security-spec';

export class ProductController {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  @post('/products', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Product) } },
      },
    },
  })
  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'], voters: [basicAuthorization] })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProduct',
            exclude: ['productId'],
          }),
        },
      },
    })
    product: Omit<Product, 'productId'>,
  ): Promise<Product> {
    return this.productRepository.create(product);
  }

  @get('/products/count', {
    responses: {
      '200': {
        description: 'Product model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Product))
    where?: Where<Product>,
  ): Promise<Count> {
    return this.productRepository.count(where);
  }

  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Product model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Product, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Product))
    filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.productRepository.find(filter);
  }

  @patch('/products', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'], voters: [basicAuthorization] })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, { partial: true }),
        },
      },
    })
    product: Product,
    @param.query.object('where', getWhereSchemaFor(Product))
    where?: Where<Product>,
  ): Promise<Count> {
    return this.productRepository.updateAll(product, where);
  }

  @get('/products/{id}', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Product, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter', getFilterSchemaFor(Product))
    filter?: Filter<Product>,
  ): Promise<Product> {
    return this.productRepository.findById(id, filter);
  }

  @patch('/products/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Product PATCH success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'], voters: [basicAuthorization] })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, { partial: true }),
        },
      },
    })
    product: Product,
  ): Promise<void> {
    await this.productRepository.updateById(id, product);
  }

  @put('/products/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Product PUT success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'], voters: [basicAuthorization] })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() product: Product,
  ): Promise<void> {
    await this.productRepository.replaceById(id, product);
  }

  @del('/products/{id}', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '204': {
        description: 'Product DELETE success',
      },
    },
  })
  @authenticate('jwt')
  @authorize({ allowedRoles: ['admin'], voters: [basicAuthorization] })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.productRepository.deleteById(id);
  }


  @post('/products/listid', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Product model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Array) } },
      },
    },
  })
  async findListID(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Array, {
            title: 'List ID'
          }),
        },
      },
    })
    list: string[],
  ): Promise<Product[]> {
    let data: string[] = []
    if (list) {
      data = list
    }
    return this.productRepository.find({ where: { productId: { inq: data } } });
  }

  @get('/products/slug/{slug}', {
    responses: {
      '200': {
        description: 'Lấy nội dung PRODUCT qua SLUG',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Product, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findSlug(
    @param.path.string('slug') slug: string
  ): Promise<Product[]> {
    return this.productRepository.find({ where: { slug } });
  }

  @post('/products/deleteList', {
    security: OPERATION_SECURITY_SPEC,
    responses: {
      '200': {
        description: 'Delete list user with ID',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                count: {
                  type: 'integer',
                  format: 'int64'
                },
              },
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
  async deleteByListId(
    @requestBody({
      description: 'The input of deleteByListId function',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['list'],
            properties: {
              list: {
                type: 'array',
                items: {
                  type: "string"
                }
              }
            },
          }
        },
      },
    }) listId: RequestListIdDeleteList,
  ): Promise<ResponseListIdDeleteList> {
    const { list } = listId
    // @ts-ignore
    return this.productRepository.deleteAll({ _id: { inq: [...list] } })
  }
}
