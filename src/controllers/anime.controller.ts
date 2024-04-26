import {intercept} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {UuidInterceptor} from '../interceptors';
import {Anime} from '../models';
import {AnimeRepository} from '../repositories';

export class AnimeController {
  constructor(
    @repository(AnimeRepository)
    public animeRepository: AnimeRepository,
  ) { }

  @post('/anime')
  @response(201, {
    description: 'Anime model instance',
    content: {'application/json': {schema: getModelSchemaRef(Anime)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anime, {
            title: 'NewAnime',

          }),
        },
      },
    })
    anime: Anime,
  ): Promise<Anime> {
    return this.animeRepository.create(anime);
  }

  @get('/anime/count')
  @response(200, {
    description: 'Anime model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Anime) where?: Where<Anime>,
  ): Promise<Count> {
    return this.animeRepository.count(where);
  }

  @get('/anime')
  @response(200, {
    description: 'Array of Anime model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Anime, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Anime) filter?: Filter<Anime>,
  ): Promise<Anime[]> {
    return this.animeRepository.find(filter);
  }

  @patch('/anime')
  @response(200, {
    description: 'Anime PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anime, {partial: true}),
        },
      },
    })
    anime: Anime,
    @param.where(Anime) where?: Where<Anime>,
  ): Promise<Count> {
    return this.animeRepository.updateAll(anime, where);
  }

  @get('/anime/{id}')
  @response(200, {
    description: 'Anime model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Anime, {includeRelations: true}),
      },
    },
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Anime, {exclude: 'where'}) filter?: FilterExcludingWhere<Anime>
  ): Promise<Anime> {
    return this.animeRepository.findById(id, filter);
  }

  @patch('/anime/{id}')
  @response(204, {
    description: 'Anime PATCH success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Anime, {partial: true}),
        },
      },
    })
    anime: Anime,
  ): Promise<void> {
    await this.animeRepository.updateById(id, anime);
  }

  @put('/anime/{id}')
  @response(204, {
    description: 'Anime PUT success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() anime: Anime,
  ): Promise<void> {
    await this.animeRepository.replaceById(id, anime);
  }

  @del('/anime/{id}')
  @response(204, {
    description: 'Anime DELETE success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.animeRepository.deleteById(id);
  }
}
