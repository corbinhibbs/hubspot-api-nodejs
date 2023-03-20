import * as _ from 'lodash'
import { Configuration, createConfiguration } from '../../../../codegen/crm/products/configuration'
import {
  AssociationsApi,
  BasicApi,
  BatchApi,
  RequestContext,
  ResponseContext,
  SearchApi,
  SimplePublicObjectWithAssociations,
} from '../../../../codegen/crm/products/index'
import { Observable } from '../../../../codegen/crm/products/rxjsStub'
import { ApiClientConfigurator } from '../../../configuration/ApiClientConfigurator'
import { IConfiguration } from '../../../configuration/IConfiguration'
import { getAll } from '../../../services/getAll'

export class ProductsDiscovery {
  public associationsApi: AssociationsApi
  public basicApi: BasicApi
  public batchApi: BatchApi
  public searchApi: SearchApi

  constructor(config: IConfiguration) {
    const configuration = createConfiguration(
      ApiClientConfigurator.getParams<
        RequestContext,
        ResponseContext,
        Observable<RequestContext>,
        Observable<ResponseContext>
      >(config, Observable, Observable),
    )

    this.associationsApi = new AssociationsApi(configuration)
    this.basicApi = new BasicApi(configuration)
    this.batchApi = new BatchApi(configuration)
    this.searchApi = new SearchApi(configuration)
  }

  public async getAll(
    limit?: number,
    after?: string,
    properties?: string[],
    propertiesWithHistory?: string[],
    associations?: string[],
    archived?: boolean,
  ): Promise<SimplePublicObjectWithAssociations[]> {
    return await getAll<SimplePublicObjectWithAssociations, Configuration>(
      this.basicApi,
      limit,
      after,
      properties,
      propertiesWithHistory,
      associations,
      archived,
    )
  }

  public async getById(
    productId: string,
    properties?: string[],
    propertiesWithHistory?: Array<string>,
    associations?: Array<string>,
    archived?: boolean,
    idProperty?: string,
    _options?: Configuration,
  ): Promise<any> {
    return await this.basicApi.getById(
      productId,
      properties,
      propertiesWithHistory,
      associations,
      archived,
      idProperty,
      _options,
    )
  }
}
