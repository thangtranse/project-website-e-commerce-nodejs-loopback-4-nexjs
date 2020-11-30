import {DefaultCrudRepository} from '@loopback/repository';
import {News, NewsRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype.NewsId,
  NewsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(News, dataSource);
  }
}
