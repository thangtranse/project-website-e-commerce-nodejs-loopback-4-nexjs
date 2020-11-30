// Copyright IBM Corp. 2019,2020. All Rights Reserved.
// Node module: loopback4-example-shopping
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { Entity, model, property } from '@loopback/repository';

@model()
export class News extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  NewsId?: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string; // Title product

  @property({
    type: 'string',
  })
  image?: string; // images thumb

  @property({
    type: 'string',
  })
  description?: string; // description production

  @property({
    type: 'string',
  })
  details?: string; // details production

  // Thangtm13 add dnv option

  @property({
    type: 'string',
    required: true,
  })
  slug: string; // path URL

  @property({
    type: 'string',
    default: 'n',
  })
  best?: string; // product is best selling ?

  @property.array(Object, {})
  type?: Object[]; // product type

  @property({
    type: 'date',
    default: new Date(),
  })
  createAt: string;
  // END - Thangtm13 add dnv option

  @property.array(String, {})
  album: string[];

  @property.array(Object, {})
  object: Object[];

  constructor(data?: Partial<News>) {
    super(data);
  }
}

export interface NewsRelations {
  // describe navigational properties here
}

export type NewsWithRelations = News & NewsRelations;
