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
import {Studio} from '../models';
import {StudioRepository} from '../repositories';

export class StudioController {
  constructor(
    @repository(StudioRepository)
    public studioRepository: StudioRepository,
  ) { }

  @post('/studio')
  @response(201, {
    description: 'Studio model instance',
    content: {'application/json': {schema: getModelSchemaRef(Studio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Studio, {
            title: 'NewStudio',

          }),
        },
      },
    })
    studio: Studio,
  ): Promise<Studio> {
    return this.studioRepository.create(studio);
  }

  @get('/studio/count')
  @response(200, {
    description: 'Studio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Studio) where?: Where<Studio>,
  ): Promise<Count> {
    return this.studioRepository.count(where);
  }

  @get('/studio')
  @response(200, {
    description: 'Array of Studio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Studio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Studio) filter?: Filter<Studio>,
  ): Promise<Studio[]> {
    return this.studioRepository.find(filter);
  }

  @patch('/studio')
  @response(200, {
    description: 'Studio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Studio, {partial: true}),
        },
      },
    })
    studio: Studio,
    @param.where(Studio) where?: Where<Studio>,
  ): Promise<Count> {
    return this.studioRepository.updateAll(studio, where);
  }

  @get('/studio/{id}')
  @response(200, {
    description: 'Studio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Studio, {includeRelations: true}),
      },
    },
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Studio, {exclude: 'where'}) filter?: FilterExcludingWhere<Studio>
  ): Promise<Studio> {
    return this.studioRepository.findById(id, filter);
  }

  @patch('/studio/{id}')
  @response(204, {
    description: 'Studio PATCH success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Studio, {partial: true}),
        },
      },
    })
    studio: Studio,
  ): Promise<void> {
    await this.studioRepository.updateById(id, studio);
  }

  @put('/studio/{id}')
  @response(204, {
    description: 'Studio PUT success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() studio: Studio,
  ): Promise<void> {
    await this.studioRepository.replaceById(id, studio);
  }

  @del('/studio/{id}')
  @response(204, {
    description: 'Studio DELETE success',
  })
  @intercept(UuidInterceptor.BINDING_KEY)
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.studioRepository.deleteById(id);
  }
}
