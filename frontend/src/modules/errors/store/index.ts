import { RootState } from '@/store/types';
import {
  CommitOptions, Module, Store as VuexStore,
} from 'vuex';
import { getters } from './getters/getters';
import { Mutations } from './mutations/mutation-types';
import { mutations } from './mutations/mutations';
import { ErrorState } from './types';

export const state: ErrorState = {
  error: undefined,

  errors: [],
};

export type Store<S = ErrorState> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>
}

export const error: Module<ErrorState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};
