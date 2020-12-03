import {Entity, model, property} from '@loopback/repository';

export interface logoImageInterface {
  default: string,
  favicon: string
}
@model()
export class AppSetting extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'array',
    itemType: 'string',
  })
  addressCompany?: string[];

  @property({
    type: 'array',
    itemType: 'object',
  })
  deputy?: object[];

  @property({
    type: 'object',
    itemType: 'object',
  })
  socialNetwork?: Object;

  @property({
    type: 'object',
    itemType: 'object',
  })
  logoImage?: logoImageInterface


  constructor(data?: Partial<AppSetting>) {
    super(data);
  }
}

export interface AppSettingRelations {
  // describe navigational properties here
}

export type AppSettingWithRelations = AppSetting & AppSettingRelations;
