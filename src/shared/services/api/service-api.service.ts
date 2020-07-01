import { ApiService } from './api.service';

import { Service } from '../../models/service.model';

export class ServiceApiService extends ApiService<Service> {
  constructor() {
    super('service');
  }
}


export const serviceApiService = new ServiceApiService();
