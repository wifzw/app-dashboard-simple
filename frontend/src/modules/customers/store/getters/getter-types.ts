import { CustomerState } from '../types';

/* eslint-disable no-unused-vars */
export enum getterTypes {
	GET_CUSTOMER_INDEX_BY_ID = 'GET_CUSTOMER_INDEX_BY_ID',
}

export type Getters<S = CustomerState> = {
	[getterTypes.GET_CUSTOMER_INDEX_BY_ID]: (state: S) => (id: string) => number
}
