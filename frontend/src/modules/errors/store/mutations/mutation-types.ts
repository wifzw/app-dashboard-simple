import { ErrorState, IErrorType } from '../types';

/* eslint-disable no-unused-vars */
export enum mutationTypes {
	SET_ERROR_TYPE = 'SET_ERROR_TYPE',

	ADD_ERROR = 'ADD_ERROR',
	REMOVE_ERROR = 'REMOVE_ERROR',
	RESET_ERROR = 'RESET_ERROR'
}

export type Mutations<S = ErrorState> = {
	[mutationTypes.SET_ERROR_TYPE](
		state: S,
		error: IErrorType
	): void

	[mutationTypes.REMOVE_ERROR](
		state: S,
		indexError: number
	): void

	[mutationTypes.RESET_ERROR](
		state: S,
	): void
}
