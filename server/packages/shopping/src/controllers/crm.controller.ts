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
  HttpErrors
} from '@loopback/rest';
import { inject } from '@loopback/context';
import { CrmAgentHub } from '../models';
import { CrmAgentHubRepository } from '../repositories';
import { EmailManagerBindings } from '../keys';
import { EmailManager } from '../services/email.service';

export class CrmController {
  constructor(
    @repository(CrmAgentHubRepository)
    public crmAgentHubRepository: CrmAgentHubRepository,

    @inject(EmailManagerBindings.SEND_MAIL)
    public emailManager: EmailManager,
  ) { }

  @post('/crm-agent-hubs', {
    responses: {
      '200': {
        description: 'CrmAgentHub model instance',
        content: { 'application/json': { schema: getModelSchemaRef(CrmAgentHub) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrmAgentHub, {
            title: 'NewCrmAgentHub',
            exclude: ['id'],
          }),
        },
      },
    })
    crmAgentHub: Omit<CrmAgentHub, 'id'>,
  ): Promise<CrmAgentHub> {

    const mailOptions = {
      to: "thangtran.se@gmail.com",
      subject: "Email thông báo!",
      html: `<h1>Agent Hub</h1><br/><p>${crmAgentHub.fullname} đã đăng ký vui lòng truy cậy www.DNVtravel.com/admin để xem thông tin chi tiết</p>`
    };

    await this.emailManager.sendMail(mailOptions).then(function (res: any) {
      return { message: `Successfully sent reset mail to ${mailOptions.to}` };
    }).catch(function (err: any) {
      console.log(err)
      throw new HttpErrors.UnprocessableEntity(`Error in sending E-mail to ${mailOptions.to}`);
    });

    return this.crmAgentHubRepository.create(crmAgentHub);
  }

  @get('/crm-agent-hubs/count', {
    responses: {
      '200': {
        description: 'CrmAgentHub model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CrmAgentHub) where?: Where<CrmAgentHub>,
  ): Promise<Count> {
    return this.crmAgentHubRepository.count(where);
  }

  @get('/crm-agent-hubs', {
    responses: {
      '200': {
        description: 'Array of CrmAgentHub model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CrmAgentHub, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CrmAgentHub) filter?: Filter<CrmAgentHub>,
  ): Promise<CrmAgentHub[]> {
    return this.crmAgentHubRepository.find(filter);
  }

  @patch('/crm-agent-hubs', {
    responses: {
      '200': {
        description: 'CrmAgentHub PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrmAgentHub, { partial: true }),
        },
      },
    })
    crmAgentHub: CrmAgentHub,
    @param.where(CrmAgentHub) where?: Where<CrmAgentHub>,
  ): Promise<Count> {
    return this.crmAgentHubRepository.updateAll(crmAgentHub, where);
  }

  @get('/crm-agent-hubs/{id}', {
    responses: {
      '200': {
        description: 'CrmAgentHub model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CrmAgentHub, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(CrmAgentHub, { exclude: 'where' }) filter?: FilterExcludingWhere<CrmAgentHub>
  ): Promise<CrmAgentHub> {
    return this.crmAgentHubRepository.findById(id, filter);
  }

  @patch('/crm-agent-hubs/{id}', {
    responses: {
      '204': {
        description: 'CrmAgentHub PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrmAgentHub, { partial: true }),
        },
      },
    })
    crmAgentHub: CrmAgentHub,
  ): Promise<void> {
    await this.crmAgentHubRepository.updateById(id, crmAgentHub);
  }

  @put('/crm-agent-hubs/{id}', {
    responses: {
      '204': {
        description: 'CrmAgentHub PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() crmAgentHub: CrmAgentHub,
  ): Promise<void> {
    await this.crmAgentHubRepository.replaceById(id, crmAgentHub);
  }

  @del('/crm-agent-hubs/{id}', {
    responses: {
      '204': {
        description: 'CrmAgentHub DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.crmAgentHubRepository.deleteById(id);
  }
}
