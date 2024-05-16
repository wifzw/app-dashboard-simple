import { ActionContext, DispatchOptions } from 'vuex';
import { RootState, RootStateKeys } from '@/store/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Mutations as MutationsSuccesses } from '@/modules/success/store/mutations/mutation-types';
import { Mutations } from '../mutations/mutation-types';
import { Getters } from '../getters/getter-types';
import { CustomerState, ICustomerPayload, ICustomerStatusPayload } from '../types';

export enum actionTypes {
	GET_CUSTOMERS = 'GET_CUSTOMERS',
	CREATE_CUSTOMER = 'CREATE_CUSTOMER',
	UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
	UPDATE_STATUS_CUSTOMER = 'UPDATE_STATUS_CUSTOMER',
	SOFT_DELETE_CUSTOMER = 'SOFT_DELETE_CUSTOMER',
	DELETE_CUSTOMER = 'DELETE_CUSTOMER',
}

export interface Actions {
	[actionTypes.GET_CUSTOMERS]:
	(context: AugmentedActionContext) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.CREATE_CUSTOMER]:
	(context: AugmentedActionContext, payload: ICustomerPayload) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.UPDATE_CUSTOMER]:
	(context: AugmentedActionContext, data: { id: string, payload: ICustomerPayload}) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.UPDATE_STATUS_CUSTOMER]:
	(context: AugmentedActionContext, data: { id: string, payload: ICustomerStatusPayload}) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.SOFT_DELETE_CUSTOMER]:
	(context: AugmentedActionContext, id: string) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.DELETE_CUSTOMER]:
	(context: AugmentedActionContext, id: string) =>
	Promise<[AxiosResponse | null, AxiosError | null]>
}

// Type [intellisense] { getters, commit, dispatch }
type AugmentedActionContext = {
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>
	}

	commit<K extends keyof MutationsSuccesses>(
		key: `${RootStateKeys.SUCCESS}/${K}`,
		payload?: Parameters<MutationsSuccesses[K]>[1],
		data?: { root: boolean }
	): ReturnType<MutationsSuccesses[K]>

	commit<K extends keyof Mutations>(
		key: K,
		payload?: Parameters<Mutations[K]>[1]
	): ReturnType<Mutations[K]>

	dispatch<K extends keyof Actions>(
		key: K,
		payload: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>
} & Omit<ActionContext<CustomerState, RootState>, 'getters' | 'commit' | 'dispatch'>
