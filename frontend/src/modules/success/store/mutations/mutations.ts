import { MutationTree } from 'vuex';
import { SuccessState } from '../types';
import { Mutations, mutationTypes as types } from './mutation-types';

export const mutations: MutationTree<SuccessState> & Mutations = {
  [types.ADD_SUCCESS](state, error) {
    state.successes.push(error);
  },

  [types.REMOVE_SUCCESS](state, indexError) {
    state.successes.splice(indexError, 1);
  },

  [types.RESET_SUCCESS](state) {
    state.successes = [];
  },
};

export default { mutations };
