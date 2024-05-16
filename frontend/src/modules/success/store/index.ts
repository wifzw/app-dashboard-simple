import { RootState } from '@/store/types';
import {
  CommitOptions, Module, Store as VuexStore,
} from 'vuex';
import { getters } from './getters/getters';
import { Mutations } from './mutations/mutation-types';
import { mutations } from './mutations/mutations';
import { SuccessState } from './types';

export const state: SuccessState = {
  successes: [],
};

export type Store<S = SuccessState> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>
}

export const success: Module<SuccessState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
};
