import { ConfigurationState } from '../types';

/* eslint-disable no-unused-vars */
export enum mutationTypes {
	UPDATE_NAVIGATION_DRAWER_MINI_VARIANT = 'UPDATE_NAVIGATION_DRAWER_MINI_VARIANT',
	UPDATE_NAVIGATION_DRAWER_VALUE_OPEN = 'UPDATE_NAVIGATION_DRAWER_VALUE_OPEN',
}

export type Mutations<S = ConfigurationState> = {
	[mutationTypes.UPDATE_NAVIGATION_DRAWER_MINI_VARIANT](
		state: S,
		value: boolean
	): void

	[mutationTypes.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN](
		state: S,
		value: boolean
	): void
}
