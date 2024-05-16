import { AuthenticationState, IUserLogged } from '../types';

/* eslint-disable no-unused-vars */
export enum mutationTypes {
	SET_IS_AUTHENTICATED = 'SET_IS_AUTHENTICATED',
	SET_TOKEN = 'SET_TOKEN',
	SET_USER_LOGGED = 'SET_USER_LOGGED',
	LOGOUT = 'LOGOUT'
}

export type Mutations<S = AuthenticationState> = {
	[mutationTypes.SET_IS_AUTHENTICATED](
		state: S,
		value: boolean
	): void

	[mutationTypes.SET_TOKEN](
		state: S,
		token: string
	): void

	[mutationTypes.SET_USER_LOGGED](
		state: S,
		user: IUserLogged
	): void

	[mutationTypes.LOGOUT](
		state: S,
	): void
}
