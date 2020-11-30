import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {PageHome, PageHomeRelations} from '../models';

export class PageHomeRepository extends DefaultCrudRepository<
  PageHome,
  typeof PageHome.prototype.key,
  PageHomeRelations
  > {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(PageHome, dataSource);
  }
}
