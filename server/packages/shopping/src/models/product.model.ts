// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  productId?: string; // id sản phẩm

  @property({
    type: 'string',
    required: true,
  })
  name: string; // tên sản phẩm

  @property({
    type: 'string',
    required: true,
  })
  title: string; // tên sản phẩm

  @property({
    type: 'string',
    required: true,
  })
  slug: string; // path URL
  // ------- IMAGE -------
  @property.array(String, {})
  album?: string[];

  @property({
    type: 'string',
  })
  image?: string; // Hình ảnh đại diện cho sản phẩm
  // ------- END IMAGE -------
  // ------- CONTENT PRODUCT -------
  @property({
    type: 'string',
  })
  description?: string; // Mô tả ngắn cho sản phẩm

  @property({
    type: 'string',
  })
  details?: string; // Mô tả chi tiết sản phẩm
  // ------- END CONTENT PRODUCT -------
  // ------- PRICE -------
  @property({
    type: 'boolean',
    default: false,
  })
  bestSelling?: boolean; // product is best selling

  @property({
    type: 'string',
  })
  unit?: string; // đơn vị tính

  @property({
    type: 'number',
    default: 0,
    required: true,
  })
  price: number; // giá sản phẩm

  @property({
    type: 'number'
  })
  discountInPercent?: number; // phần trăm được giảm

  @property({
    type: 'number',
    default: 0,
  })
  priceSales?: number; // price sale product
  // ------- END PRICE -------
  // ------- CATEGORY -------
  @property.array(Object, {})
  type?: Object[]; // product type
  // ------- END CATEGORY -------

  @property({
    type: 'date',
    default: new Date(),
  })
  createAt: string;

  @property.array(Object, {})
  object: Object[];

  // END - Thangtm13 add dnv option
  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
