import {inject, intercept} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where,
  repository,
} from '@loopback/repository';
import {
  RequestContext,
  RestBindings,
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
  Response
} from '@loopback/rest';
import {UuidInterceptor} from '../interceptors';
import {Chapter} from '../models';
import {ChapterRepository} from '../repositories';

export class ChapterController {
  constructor(
    @repository(ChapterRepository)
    public chapterRepository: ChapterRepository,
    @inject(RestBindings.Http.CONTEXT)
    private requestCtx: RequestContext,
  ) { }

  @post('/chapter')
  @response(201, {
    description: 'Chapter model instance',
    content: {'application/json': {schema: getModelSchemaRef(Chapter)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chapter, {
            title: 'NewChapter',

          }),
        },
      },
    })
    chapter: Chapter,
  ): Promise<Response> {
    return this.requestCtx.response.status(201).send(await this.chapterRepository.create(chapter));
  }

  @get('/chapter/count')
  @response(200, {
    description: 'Chapter model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Chapter) where?: Where<Chapter>,
  ): Promise<Count> {
    return this.chapterRepository.count(where);
  }

  @get('/chapter')
  @response(200, {
    description: 'Array of Chapter model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Chapter, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Chapter) filter?: Filter<Chapter>,
  ): Promise<Chapter[]> {
    return this.chapterRepository.find(filter);
  }

  @patch('/chapter')
  @response(200, {
    description: 'Chapter PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chapter, {partial: true}),
        },
      },
    })
    chapter: Chapter,
    @param.where(Chapter) where?: Where<Chapter>,
  ): Promise<Count> {
    return this.chapterRepository.updateAll(chapter, where);
  }

  @get('/chapter/{id}')
  @response(200, {
    description: 'Chapter model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Chapter, {includeRelations: true}),
      },
    },
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Chapter, {exclude: 'where'}) filter?: FilterExcludingWhere<Chapter>
  ): Promise<Chapter> {
    return this.chapterRepository.findById(id, filter);
  }

  @patch('/chapter/{id}')
  @response(204, {
    description: 'Chapter PATCH success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Chapter, {partial: true}),
        },
      },
    })
    chapter: Chapter,
  ): Promise<void> {
    await this.chapterRepository.updateById(id, chapter);
  }

  @put('/chapter/{id}')
  @response(204, {
    description: 'Chapter PUT success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() chapter: Chapter,
  ): Promise<void> {
    await this.chapterRepository.replaceById(id, chapter);
  }

  @del('/chapter/{id}')
  @response(204, {
    description: 'Chapter DELETE success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.chapterRepository.deleteById(id);
  }
}
