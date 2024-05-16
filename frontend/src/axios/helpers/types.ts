import { AxiosError, AxiosResponse } from 'axios';

export type PromiseInterceptorResponseType<T, E> =
Promise<[AxiosResponse<T> | null, AxiosError<E> | null]>;
