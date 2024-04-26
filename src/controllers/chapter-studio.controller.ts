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
  Studio,
} from '../models';
import {ChapterRepository} from '../repositories';

export class ChapterStudioController {
  constructor(
    @repository(ChapterRepository)
    public chapterRepository: ChapterRepository,
  ) { }

  @get('/chapters/{id}/studio', {
    responses: {
      '200': {
        description: 'Studio belonging to Chapter',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Studio),
          },
        },
      },
    },
  })
  async getStudio(
    @param.path.string('id') id: typeof Chapter.prototype.id,
  ): Promise<Studio> {
    return this.chapterRepository.studio(id);
  }
}
