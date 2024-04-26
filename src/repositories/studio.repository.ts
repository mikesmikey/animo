import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Studio, StudioRelations} from '../models';

export class StudioRepository extends DefaultCrudRepository<
  Studio,
  typeof Studio.prototype.id,
  StudioRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Studio, dataSource);
  }
}
