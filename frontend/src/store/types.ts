import { AuthenticationState } from '@/modules/authentication/store/types';
import { ConfigurationState } from '@/modules/configuration/store/types';
import { CustomerState } from '@/modules/customers/store/types';
import { ErrorState } from '@/modules/errors/store/types';
import { SuccessState } from '@/modules/success/store/types';

export interface RootState {
	Authentication: AuthenticationState
	Customer: CustomerState
	Configuration: ConfigurationState
	Success: SuccessState
	Error: ErrorState
}

export enum RootStateKeys {
  AUTHENTICATION = 'Authentication',
  CUSTOMER = 'Customer',
	CONFIGURATION = 'Configuration',
	SUCCESS = 'Success',
	ERROR = 'Error'
}

export interface ApiRequestError {
	id: string
	message: string
}
