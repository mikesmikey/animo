import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Chapter, ChapterRelations} from '../models';

export class ChapterRepository extends DefaultCrudRepository<
  Chapter,
  typeof Chapter.prototype.id,
  ChapterRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Chapter, dataSource);
  }
}
