import { MutationTree } from 'vuex';
import { ErrorState } from '../types';
import { Mutations, mutationTypes as types } from './mutation-types';

export const mutations: MutationTree<ErrorState> & Mutations = {
  [types.SET_ERROR_TYPE](state, errorType) {
    state.error = errorType;
  },

  [types.ADD_ERROR](state, error) {
    state.errors.push(error);
  },

  [types.REMOVE_ERROR](state, indexError) {
    state.errors.splice(indexError, 1);
  },

  [types.RESET_ERROR](state) {
    state.errors = [];
  },
};

export default { mutations };
