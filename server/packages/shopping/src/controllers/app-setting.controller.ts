import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import { AppSetting } from '../models';
import { AppSettingRepository } from '../repositories';

export class AppSettingController {
  constructor(
    @repository(AppSettingRepository)
    public appSettingRepository: AppSettingRepository,
  ) { }

  @post('/app-settings', {
    responses: {
      '200': {
        description: 'AppSetting model instance',
        content: { 'application/json': { schema: getModelSchemaRef(AppSetting) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppSetting, {
            title: 'NewAppSetting',
            exclude: ['id'],
          }),
        },
      },
    })
    appSetting: Omit<AppSetting, 'id'>,
  ): Promise<AppSetting> {
    return this.appSettingRepository.create(appSetting);
  }

  @get('/app-settings/count', {
    responses: {
      '200': {
        description: 'AppSetting model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(AppSetting) where?: Where<AppSetting>,
  ): Promise<Count> {
    return this.appSettingRepository.count(where);
  }

  @get('/app-settings', {
    responses: {
      '200': {
        description: 'Array of AppSetting model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AppSetting, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AppSetting) filter?: Filter<AppSetting>,
  ): Promise<AppSetting[]> {
    return this.appSettingRepository.find(filter);
  }
  
  @get('/app-settings/default', {
    responses: {
      '200': {
        description: 'Website value default',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AppSetting, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async findDefault(
  ): Promise<AppSetting> {
    return this.appSettingRepository.findById("default");
  }

  @patch('/app-settings', {
    responses: {
      '200': {
        description: 'AppSetting PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppSetting, { partial: true }),
        },
      },
    })
    appSetting: AppSetting,
    @param.where(AppSetting) where?: Where<AppSetting>,
  ): Promise<Count> {
    return this.appSettingRepository.updateAll(appSetting, where);
  }

  @get('/app-settings/{id}', {
    responses: {
      '200': {
        description: 'AppSetting model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AppSetting, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AppSetting, { exclude: 'where' }) filter?: FilterExcludingWhere<AppSetting>
  ): Promise<AppSetting> {
    return this.appSettingRepository.findById(id, filter);
  }

  @patch('/app-settings/{id}', {
    responses: {
      '204': {
        description: 'AppSetting PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AppSetting, { partial: true }),
        },
      },
    })
    appSetting: AppSetting,
  ): Promise<void> {
    await this.appSettingRepository.updateById(id, appSetting);
  }

  @put('/app-settings/{id}', {
    responses: {
      '204': {
        description: 'AppSetting PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() appSetting: AppSetting,
  ): Promise<void> {
    await this.appSettingRepository.replaceById(id, appSetting);
  }

  @del('/app-settings/{id}', {
    responses: {
      '204': {
        description: 'AppSetting DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.appSettingRepository.deleteById(id);
  }
}
