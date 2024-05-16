import { RootState } from '@/store/types';
import { GetterTree } from 'vuex';
import { CustomerState } from '../types';
import { Getters, getterTypes as types } from './getter-types';

export const getters: GetterTree<CustomerState, RootState> & Getters = {
  [types.GET_CUSTOMER_INDEX_BY_ID]: (state) => (customerId) => state.customers.data.findIndex(
    (customer) => customer.id === customerId,
  ),
};

export default getters;
