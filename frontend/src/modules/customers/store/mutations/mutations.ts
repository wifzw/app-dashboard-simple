import { MutationTree } from 'vuex';
import { CustomerState } from '../types';
import { Mutations, mutationTypes as types } from './mutation-types';

export const mutations: MutationTree<CustomerState> & Mutations = {
  [types.SET_OPEN_CREATE_MODAL](state, value) {
    state.isCreateCustomerModal = value;
  },

  [types.SET_OPEN_UPDATE_MODAL](state, value) {
    state.isUpdateCustomerModal = value;
  },

  [types.SET_CUSTOMERS](state, customers) {
    state.customers.data = customers;
  },

  [types.ADD_CUSTOMER](state, customer) {
    state.customers.data.unshift(customer);
  },

  [types.UPDATE_CUSTOMER](state, { indexCustomer, customer }) {
    state.customers.data.splice(indexCustomer, 1, customer);
  },

  [types.DELETE_CUSTOMER](state, indexCustomer) {
    state.customers.data.splice(indexCustomer, 1);
  },

  [types.SET_SELECTED_CUSTOMER](state, customer) {
    state.selectedCustomer = customer;
  },

  [types.RESET_SELECTED_CUSTOMER](state) {
    state.selectedCustomer = undefined;
  },

  [types.UPDATE_LOADING_CUSTOMER](state, loading) {
    state.customers.loading = loading;
  },

  [types.UPDATE_SEARCH_CUSTOMER](state, search) {
    state.customers.filters.search = search;
  },
};

export default { mutations };
