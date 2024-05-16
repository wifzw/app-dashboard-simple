import { CustomerState, ICustomerResponse } from '../types';

/* eslint-disable no-unused-vars */
export enum mutationTypes {
	SET_OPEN_CREATE_MODAL = 'SET_OPEN_CREATE_MODAL',
	SET_OPEN_UPDATE_MODAL = 'SET_OPEN_UPDATE_MODAL',

	SET_CUSTOMERS = 'SET_CUSTOMERS',
	ADD_CUSTOMER = 'ADD_CUSTOMER',
	UPDATE_CUSTOMER = 'UPDATE_CUSTOMER',
	DELETE_CUSTOMER = 'DELETE_CUSTOMER',

	SET_SELECTED_CUSTOMER = 'SET_SELECTED_CUSTOMER',
	RESET_SELECTED_CUSTOMER = 'RESET_SELECTED_CUSTOMER',

	UPDATE_LOADING_CUSTOMER = 'UPDATE_LOADING_CUSTOMER',
	UPDATE_SEARCH_CUSTOMER = 'UPDATE_SEARCH_CUSTOMER',
}

export type Mutations<S = CustomerState> = {
	[mutationTypes.SET_OPEN_CREATE_MODAL](
		state: S,
		value: boolean
	): void

	[mutationTypes.SET_OPEN_UPDATE_MODAL](
		state: S,
		value: boolean
	): void

	[mutationTypes.SET_CUSTOMERS](
		state: S,
		customers: ICustomerResponse[]
	): void

	[mutationTypes.ADD_CUSTOMER](
		state: S,
		customer: ICustomerResponse
	): void

	[mutationTypes.UPDATE_CUSTOMER](
		state: S,
		data: { indexCustomer: number, customer: ICustomerResponse }
	): void

	[mutationTypes.DELETE_CUSTOMER](
		state: S,
		indexCustomer: number
	): void

	[mutationTypes.SET_SELECTED_CUSTOMER](
		state: S,
		customer?: ICustomerResponse
	): void

	[mutationTypes.RESET_SELECTED_CUSTOMER](
		state: S,
	): void

	[mutationTypes.UPDATE_LOADING_CUSTOMER](
		state: S,
		value: boolean
	): void

	[mutationTypes.UPDATE_SEARCH_CUSTOMER](
		state: S,
		search: string | null
	): void
}
