import { AxiosError, AxiosResponse } from 'axios';
import API from '@/axios';
import InterceptorResponseAxios from '@/axios/helpers/InterceptorResponse';
import { IRegisterPayload, ILoginPayload } from '../store/types';

const EndpointLogin = '/auth/login';
const EndpointRegister = '/register';
const EndpointMyProfile = '/me';

export default {
  async logIn(payload: ILoginPayload):
	Promise<[AxiosResponse<{ token: string }> | null, AxiosError | null]> {
    const [response, error] = await InterceptorResponseAxios(
      API.post(EndpointLogin, payload),
    );
    return [response, error];
	 },

	 async signUp(payload: IRegisterPayload): Promise<[AxiosResponse | null, AxiosError | null]> {
    const [response, error] = await InterceptorResponseAxios(
      API.post(EndpointRegister, payload),
    );
    return [response, error];
	 },

	 async getProfileUser(): Promise<[AxiosResponse | null, AxiosError | null]> {
    const [response, error] = await InterceptorResponseAxios(
      API.get(EndpointMyProfile),
    );
    return [response, error];
	 },
};
