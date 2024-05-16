import { MutationTree } from 'vuex';
import { ConfigurationState } from '../types';
import { Mutations, mutationTypes as types } from './mutation-types';

export const mutations: MutationTree<ConfigurationState> & Mutations = {
  [types.UPDATE_NAVIGATION_DRAWER_MINI_VARIANT](state, value) {
    state.navigationDrawer.miniVariant = value;
  },

  [types.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN](state, value) {
    state.navigationDrawer.openNavigationDrawer = value;
  },
};

export default { mutations };
