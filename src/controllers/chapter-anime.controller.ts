import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Chapter,
  Anime,
} from '../models';
import {ChapterRepository} from '../repositories';

export class ChapterAnimeController {
  constructor(
    @repository(ChapterRepository)
    public chapterRepository: ChapterRepository,
  ) { }

  @get('/chapters/{id}/anime', {
    responses: {
      '200': {
        description: 'Anime belonging to Chapter',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Anime),
          },
        },
      },
    },
  })
  async getAnime(
    @param.path.string('id') id: typeof Chapter.prototype.id,
  ): Promise<Anime> {
    return this.chapterRepository.anime(id);
  }
}
