import API from '@/axios';
import InterceptorResponseAxios from '@/axios/helpers/InterceptorResponse';
import { PromiseInterceptorResponseType } from '../../../axios/helpers/types';
import { ICustomerPayload, ICustomerResponse, ICustomerStatusPayload } from '../store/types';

const Endpoint = '/customers';

export default {
  async getCustomers():
	PromiseInterceptorResponseType<ICustomerResponse[], unknown> {
    const [response, error] = await InterceptorResponseAxios(
      API.get(Endpoint),
    );
    return [response, error];
  },

  async createCustomer(payload: ICustomerPayload):
	PromiseInterceptorResponseType<ICustomerResponse, unknown> {
    const [response, error] = await InterceptorResponseAxios(
      API.post(Endpoint, payload),
    );
    return [response, error];
  },

  async updateCustomer({ id, payload }: { id: string, payload: ICustomerPayload}):
	PromiseInterceptorResponseType<ICustomerResponse, unknown> {
    const [response, error] = await InterceptorResponseAxios(
      API.put(`${Endpoint}/${id}`, payload),
    );
    return [response, error];
  },

  async updateStatusCustomer({ id, payload }: { id: string, payload: ICustomerStatusPayload}):
	PromiseInterceptorResponseType<ICustomerResponse, unknown> {
    const [response, error] = await InterceptorResponseAxios(
      API.patch(`${Endpoint}/${id}/status`, payload),
    );
    return [response, error];
  },

  async softDeleteCustomer(id: string):
	PromiseInterceptorResponseType<unknown, unknown> {
    const [response, error] = await InterceptorResponseAxios(
      API.delete(`${Endpoint}/${id}/softDelete`),
    );
    return [response, error];
  },

  async deleteCustomer(id: string):
	PromiseInterceptorResponseType<unknown, unknown> {
    const [response, error] = await InterceptorResponseAxios(
      API.delete(`${Endpoint}/${id}`),
    );
    return [response, error];
  },
};
