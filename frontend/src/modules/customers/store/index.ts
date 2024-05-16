import { RootState } from '@/store/types';
import {
  CommitOptions, DispatchOptions, Module, Store as VuexStore,
} from 'vuex';
import { actions } from './actions/actions';
import { Actions } from './actions/action-types';
import { Mutations } from './mutations/mutation-types';
import { mutations } from './mutations/mutations';
import { Getters } from './getters/getter-types';
import { getters } from './getters/getters';
import { CustomerState } from './types';

export const state: CustomerState = {
  isCreateCustomerModal: false,
  isUpdateCustomerModal: false,
  customers: {
    data: [],
    loading: false,
    filters: {
      search: null,
    },
  },
  selectedCustomer: undefined,
};

export type Store<S = CustomerState> = Omit<VuexStore<S>, 'commit' | 'getters' | 'dispatch'> & {
	getters: {
		[K in keyof Getters]: ReturnType<Getters[K]>
	}

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

export const customer: Module<CustomerState, RootState> = {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
