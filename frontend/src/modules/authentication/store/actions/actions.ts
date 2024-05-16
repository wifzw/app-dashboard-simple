import { ActionTree } from 'vuex';
import { RootState, RootStateKeys } from '@/store/types';
import status from '@/utils/constants/status';
import { mutationTypes as mutationTypesOfSuccess } from '@/modules/success/store/mutations/mutation-types';
import successTypes from '@/i18n/successes/types';
import { IRegisterPayload, ILoginPayload, AuthenticationState } from '../types';
import { mutationTypes } from '../mutations/mutation-types';
import { Actions, actionTypes as types } from './action-types';
import API from '../../service';

export const actions: ActionTree<AuthenticationState, RootState> & Actions = {
  async [types.LOG_IN]({ dispatch, commit }, payload: ILoginPayload) {
    const [response, error] = await API.logIn(payload);

    if (response) {
      commit(mutationTypes.SET_IS_AUTHENTICATED, true);
      commit(mutationTypes.SET_TOKEN, response.data.token);
      dispatch(types.GET_PROFILE_USER, undefined);
    }

    return [response, error];
  },

  async [types.SIGN_UP]({ commit }, payload: IRegisterPayload) {
    const [response, error] = await API.signUp(payload);

    if (response?.status === status.CREATED) {
      commit(
        `${RootStateKeys.SUCCESS}/${mutationTypesOfSuccess.ADD_SUCCESS}`,
        successTypes.REGISTER_CREATE,
        { root: true },
      );
    }

    return [response, error];
  },

  async [types.GET_PROFILE_USER]({ commit }) {
    const [response, error] = await API.getProfileUser();

    if (response) {
      commit(mutationTypes.SET_USER_LOGGED, response.data);
    }

    return [response, error];
  },
};

export default { actions };
