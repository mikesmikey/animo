import {inject} from '@loopback/core';
import {DefaultCrudRepository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anime, AnimeRelations, Studio} from '../models';

export class AnimeRepository extends DefaultCrudRepository<
  Anime,
  typeof Anime.prototype.id,
  AnimeRelations
> {

  public readonly studio: BelongsToAccessor<Studio, typeof Anime.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Anime, dataSource);
  }
}
