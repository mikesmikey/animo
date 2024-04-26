import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Anime,
  Studio,
} from '../models';
import {AnimeRepository} from '../repositories';

export class AnimeStudioController {
  constructor(
    @repository(AnimeRepository)
    public animeRepository: AnimeRepository,
  ) { }

  @get('/anime/{id}/studio', {
    responses: {
      '200': {
        description: 'Studio belonging to Anime',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Studio),
          },
        },
      },
    },
  })
  async getStudio(
    @param.path.string('id') id: typeof Anime.prototype.id,
  ): Promise<Studio> {
    return this.animeRepository.studio(id);
  }
}
