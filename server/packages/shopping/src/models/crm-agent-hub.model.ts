import { Entity, model, property } from '@loopback/repository';

@model()
export class CrmAgentHub extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fullname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'array',
    itemType: 'object',
  })
  customFields: object[];

  @property({
    type: 'string',
  })
  phone?: string;

  @property({
    type: 'string',
  })
  country?: string;

  @property({
    type: 'string',
  })
  companyName?: string;

  @property({
    type: 'string',
  })
  message?: string;

  @property({
    type: 'string',
  })
  position?: string;

  constructor(data?: Partial<CrmAgentHub>) {
    super(data);
  }
}

export interface CrmAgentHubRelations {
  // describe navigational properties here
}

export type CrmAgentHubWithRelations = CrmAgentHub & CrmAgentHubRelations;
