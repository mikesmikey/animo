import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Chapter, ChapterRelations, Anime, Studio} from '../models';
import {AnimeRepository} from './anime.repository';
import {StudioRepository} from './studio.repository';

export class ChapterRepository extends DefaultCrudRepository<
  Chapter,
  typeof Chapter.prototype.id,
  ChapterRelations
> {

  public readonly anime: BelongsToAccessor<Anime, typeof Chapter.prototype.id>;

  public readonly studio: BelongsToAccessor<Studio, typeof Chapter.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AnimeRepository') protected animeRepositoryGetter: Getter<AnimeRepository>, @repository.getter('StudioRepository') protected studioRepositoryGetter: Getter<StudioRepository>,
  ) {
    super(Chapter, dataSource);
    this.studio = this.createBelongsToAccessorFor('studio', studioRepositoryGetter,);
    this.registerInclusionResolver('studio', this.studio.inclusionResolver);
    this.anime = this.createBelongsToAccessorFor('anime', animeRepositoryGetter,);
    this.registerInclusionResolver('anime', this.anime.inclusionResolver);
  }
}
