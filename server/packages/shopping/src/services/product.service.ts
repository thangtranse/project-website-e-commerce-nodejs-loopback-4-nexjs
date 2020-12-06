// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT


import {ContextTags, injectable} from '@loopback/core';
import {
  repository
} from '@loopback/repository';
import {Product} from '../models';
import {ProductRepository} from '../repositories';

@injectable({tags: {[ContextTags.NAMESPACE]: 'services'}})
export class MyProductService {
  constructor(
    @repository(ProductRepository)
    public productRepository: ProductRepository,
  ) { }

  /**
   * Lấy sản phẩm mới nhất
   *
   */
  async productsNew({limit = 5, fields = {}}): Promise<Product[]> {
    return this.productRepository.find({where: {}, limit, order: ['createAt DESC'], fields})
  }

}
