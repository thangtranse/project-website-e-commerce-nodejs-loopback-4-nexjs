import {DefaultCrudRepository} from '@loopback/repository';
import {AppSetting, AppSettingRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AppSettingRepository extends DefaultCrudRepository<
  AppSetting,
  typeof AppSetting.prototype.id,
  AppSettingRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(AppSetting, dataSource);
  }
}
