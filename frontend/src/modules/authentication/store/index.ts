import { RootState } from '@/store/types';
import {
  CommitOptions, DispatchOptions, Module, Store as VuexStore,
} from 'vuex';
import { actions } from './actions/actions';
import { Actions } from './actions/action-types';
import { getters } from './getters/getters';
import { Mutations } from './mutations/mutation-types';
import { mutations } from './mutations/mutations';
import { AuthenticationState } from './types';

export const state: AuthenticationState = {
  isAuthenticated: false,
  userLogged: undefined,
  token: {
    type: 'Bearer',
    access_token: undefined,
    refresh_token: undefined,
  },
};

export type Store<S = AuthenticationState> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>
} & {
	dispatch<K extends keyof Actions>(
		key: K,
		payload: Parameters<Actions[K]>[1],
		options?: DispatchOptions
	): ReturnType<Actions[K]>
}

export const authentication: Module<AuthenticationState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
