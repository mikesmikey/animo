import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anime, AnimeRelations} from '../models';

export class AnimeRepository extends DefaultCrudRepository<
  Anime,
  typeof Anime.prototype.id,
  AnimeRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Anime, dataSource);
  }
}
