import { RootState } from '@/store/types';
import {
  CommitOptions,
  Module, Store as VuexStore,
} from 'vuex';
import { ConfigurationState } from './types';
import { Mutations } from './mutations/mutation-types';
import { mutations } from './mutations/mutations';

export const state: ConfigurationState = {
  navigationDrawer: {
    miniVariant: false,
    openNavigationDrawer: false,
  },
};

export type Store<S = ConfigurationState> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
	commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
		key: K,
		payload: P,
		options?: CommitOptions
	): ReturnType<Mutations[K]>
}

export const configuration: Module<ConfigurationState, RootState> = {
  namespaced: true,
  state,
  mutations,
};
