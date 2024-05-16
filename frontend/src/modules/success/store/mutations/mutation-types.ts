import { SuccessState } from '../types';

/* eslint-disable no-unused-vars */
export enum mutationTypes {
	ADD_SUCCESS = 'ADD_SUCCESS',
	REMOVE_SUCCESS = 'REMOVE_SUCCESS',
	RESET_SUCCESS = 'RESET_SUCCESS'
}

export type Mutations<S = SuccessState> = {
	[mutationTypes.ADD_SUCCESS](
		state: S,
		error: string
	): void

	[mutationTypes.REMOVE_SUCCESS](
		state: S,
		indexSuccess: number
	): void

	[mutationTypes.RESET_SUCCESS](
		state: S,
	): void
}
