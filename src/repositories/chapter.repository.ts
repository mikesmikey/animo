import {inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anime, Chapter, ChapterRelations, Studio} from '../models';

export class ChapterRepository extends DefaultCrudRepository<
  Chapter,
  typeof Chapter.prototype.id,
  ChapterRelations
> {

  public readonly anime: BelongsToAccessor<Anime, typeof Chapter.prototype.id>;

  public readonly studio: BelongsToAccessor<Studio, typeof Chapter.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Chapter, dataSource);
  }
}
