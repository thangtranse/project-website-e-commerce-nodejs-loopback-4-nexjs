import { Entity, model, property } from '@loopback/repository';

export interface PageHomeElementInterface {
  type: string, // type PRODUCT or NEWS
  object: string // ID of PRODUCT or NEWS
}

export interface PageHomeSettingInterface {
  contentMain: string, // Nội dung chi tiết của PAGE DRAFTJS
}

@model()
export class PageHome extends Entity {

  @property({
    type: 'string',
    id: true,
    required: true
  })
  key?: string;

  @property({
    type: 'string',
    required: true,
  })
  url: string;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  element?: PageHomeElementInterface[];

  @property({
    type: 'object',
  })
  setting?: PageHomeSettingInterface;


  constructor(data?: Partial<PageHome>) {
    super(data);
  }
}

export interface PageHomeRelations {
  // describe navigational properties here
}

export type PageHomeWithRelations = PageHome & PageHomeRelations;
