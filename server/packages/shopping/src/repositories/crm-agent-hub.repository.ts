import {DefaultCrudRepository} from '@loopback/repository';
import {CrmAgentHub, CrmAgentHubRelations} from '../models';
import {MongoDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CrmAgentHubRepository extends DefaultCrudRepository<
  CrmAgentHub,
  typeof CrmAgentHub.prototype.id,
  CrmAgentHubRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(CrmAgentHub, dataSource);
  }
}
