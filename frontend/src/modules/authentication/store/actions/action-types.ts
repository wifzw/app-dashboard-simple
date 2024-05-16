import { ActionContext, DispatchOptions } from 'vuex';
import { RootState, RootStateKeys } from '@/store/types';
import { AxiosError, AxiosResponse } from 'axios';
import { Mutations as MutationsSuccesses } from '@/modules/success/store/mutations/mutation-types';
import { Mutations } from '../mutations/mutation-types';
import { AuthenticationState, ILoginPayload, IRegisterPayload } from '../types';

export enum actionTypes {
	LOG_IN = 'LOG_IN',
	SIGN_UP = 'SIGN_UP',

	GET_PROFILE_USER = 'GET_PROFILE_USER',
}

export interface Actions {
	[actionTypes.LOG_IN]:
	(context: AugmentedActionContext, payload: ILoginPayload) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.SIGN_UP]:
	(context: AugmentedActionContext, payload: IRegisterPayload) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	[actionTypes.GET_PROFILE_USER]:
	(context: AugmentedActionContext) =>
	Promise<[AxiosResponse | null, AxiosError | null]>
}

// Type [intellisense] { getters, commit, dispatch }
type AugmentedActionContext = {
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
} & Omit<ActionContext<AuthenticationState, RootState>, 'getters' | 'commit' | 'dispatch'>
