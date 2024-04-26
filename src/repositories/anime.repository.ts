import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Anime, AnimeRelations, Studio} from '../models';
import {StudioRepository} from './studio.repository';

export class AnimeRepository extends DefaultCrudRepository<
  Anime,
  typeof Anime.prototype.id,
  AnimeRelations
> {

  public readonly studio: BelongsToAccessor<Studio, typeof Anime.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('StudioRepository') protected studioRepositoryGetter: Getter<StudioRepository>,
  ) {
    super(Anime, dataSource);
    this.studio = this.createBelongsToAccessorFor('studio', studioRepositoryGetter,);
    this.registerInclusionResolver('studio', this.studio.inclusionResolver);
  }
}
