import { ActionTree } from 'vuex';
import { RootState, RootStateKeys } from '@/store/types';
import status from '@/utils/constants/status';
import { DISABLE, ENABLE } from '@/utils/constants/generics';
import { mutationTypes as mutationTypesOfSuccess } from '@/modules/success/store/mutations/mutation-types';
import successesMessagesTypes from '@/i18n/successes/types';
import { CustomerState } from '../types';
import { mutationTypes } from '../mutations/mutation-types';
import { getterTypes } from '../getters/getter-types';
import { Actions, actionTypes as types } from './action-types';
import API from '../../service';

export const actions: ActionTree<CustomerState, RootState> & Actions = {
  async [types.GET_CUSTOMERS]({ commit }) {
    commit(mutationTypes.UPDATE_LOADING_CUSTOMER, ENABLE);

    const [response, error] = await API.getCustomers();

    if (response?.status === status.SUCCESS) {
      commit(mutationTypes.SET_CUSTOMERS, response.data);
    }

    commit(mutationTypes.UPDATE_LOADING_CUSTOMER, DISABLE);

    return [response, error];
  },

  async [types.CREATE_CUSTOMER]({ commit }, payload) {
    const [response, error] = await API.createCustomer(payload);

    if (response?.status === status.CREATED) {
      commit(
        `${RootStateKeys.SUCCESS}/${mutationTypesOfSuccess.ADD_SUCCESS}`,
        successesMessagesTypes.CUSTOMER_CREATE,
        { root: true },
      );

      commit(mutationTypes.ADD_CUSTOMER, response.data);
    }

    return [response, error];
  },

  async [types.UPDATE_CUSTOMER]({ getters, commit }, payload) {
    const [response, error] = await API.updateCustomer(payload);

    if (response?.status === status.SUCCESS) {
      commit(
        `${RootStateKeys.SUCCESS}/${mutationTypesOfSuccess.ADD_SUCCESS}`,
        successesMessagesTypes.CUSTOMER_UPDATE,
        { root: true },
      );

      const indexCustomer = getters[getterTypes.GET_CUSTOMER_INDEX_BY_ID](response.data.id);

      if (indexCustomer > -1) {
        commit(mutationTypes.UPDATE_CUSTOMER, {
          indexCustomer,
          customer: response.data,
        });
      }
    }

    return [response, error];
  },

  async [types.UPDATE_STATUS_CUSTOMER]({ getters, commit }, { id, payload }) {
    const [response, error] = await API.updateStatusCustomer({ id, payload });

    if (response?.status === status.SUCCESS) {
      commit(
        `${RootStateKeys.SUCCESS}/${mutationTypesOfSuccess.ADD_SUCCESS}`,
        successesMessagesTypes.CUSTOMER_UPDATE_STATUS,
        { root: true },
      );

      const indexCustomer = getters[getterTypes.GET_CUSTOMER_INDEX_BY_ID](response.data.id);

      if (indexCustomer > -1) {
        commit(mutationTypes.UPDATE_CUSTOMER, {
          indexCustomer,
          customer: response.data,
        });
      }
    }

    return [response, error];
  },

  async [types.SOFT_DELETE_CUSTOMER]({ getters, commit }, id) {
    const [response, error] = await API.softDeleteCustomer(id);

    if (response?.status === status.SUCCESS) {
      commit(
        `${RootStateKeys.SUCCESS}/${mutationTypesOfSuccess.ADD_SUCCESS}`,
        successesMessagesTypes.CUSTOMER_DELETE,
        { root: true },
      );

      const indexCustomer = getters[getterTypes.GET_CUSTOMER_INDEX_BY_ID](id);

      if (indexCustomer > -1) {
        commit(mutationTypes.DELETE_CUSTOMER, indexCustomer);
      }
    }

    return [response, error];
  },

  async [types.DELETE_CUSTOMER]({ getters, commit }, id) {
    const [response, error] = await API.deleteCustomer(id);

    if (response?.status === status.SUCCESS) {
      commit(
        `${RootStateKeys.SUCCESS}/${mutationTypesOfSuccess.ADD_SUCCESS}`,
        successesMessagesTypes.CUSTOMER_DELETE,
        { root: true },
      );

      const indexCustomer = getters[getterTypes.GET_CUSTOMER_INDEX_BY_ID](id);

      if (indexCustomer > -1) {
        commit(mutationTypes.DELETE_CUSTOMER, indexCustomer);
      }
    }

    return [response, error];
  },
};

export default { actions };
