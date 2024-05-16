export type errorType = 'ERR_NETWORK' | 'INTERNAL_SERVER_ERROR'

export interface IErrorType {
	code: errorType,
	route: string
}

export interface ErrorState {
	error?: IErrorType
	errors: string[]
}
