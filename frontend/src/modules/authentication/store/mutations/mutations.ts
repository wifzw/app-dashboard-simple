import { MutationTree } from 'vuex';
import { AuthenticationState } from '../types';
import { Mutations, mutationTypes as types } from './mutation-types';

export const mutations: MutationTree<AuthenticationState> & Mutations = {
  [types.SET_IS_AUTHENTICATED](state, value) {
    state.isAuthenticated = value;
  },

  [types.SET_TOKEN](state, token) {
    state.token.access_token = token;
  },

  [types.SET_USER_LOGGED](state, user) {
    state.userLogged = user;
  },

  [types.LOGOUT](state) {
    state.isAuthenticated = false;
    state.token.type = 'Bearer';
    state.token.access_token = undefined;
    state.userLogged = undefined;
  },
};

export default { mutations };
