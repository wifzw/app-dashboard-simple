import { mutationTypes } from '@/modules/authentication/store/mutations/mutation-types';
import { mutationTypes as mutationTypesOfErrors } from '@/modules/errors/store/mutations/mutation-types';
import store from '@/store';
import { RootStateKeys } from '@/store/types';
import status from '@/utils/constants/status';
import axios, { AxiosError } from 'axios';
import routesName from '@/router/types';
import { IErrorType, errorType } from '@/modules/errors/store/types';

const updateErrorType = (errorType: errorType, route: string) => {
  const payload: IErrorType = {
    code: errorType,
    route,
  };

  store.commit(
    `${RootStateKeys.ERROR}/${mutationTypesOfErrors.SET_ERROR_TYPE}`,
    payload,
    { root: true },
  );
};

const addError = (ERROR_ID: string) => {
  const indexError = store.state.Error.errors.findIndex(
    (currentError) => currentError === ERROR_ID,
  );

  if (indexError === -1) {
    store.commit(
      `${RootStateKeys.ERROR}/${mutationTypesOfErrors.ADD_ERROR}`,
      ERROR_ID,
      { root: true },
    );
  }
};

const resetAccount = () => {
  store.commit(
    `${RootStateKeys.AUTHENTICATION}/${mutationTypes.LOGOUT}`,
    undefined,
    { root: true },
  );
};

async function InterceptorResponseAxios<T>(promise: Promise<T>):
Promise<[T | null, AxiosError | null]> {
  try {
		 const result = await promise;
		 return [result, null];
  } catch (error) {
		 if (axios.isAxiosError(error)) {
      if (error.response?.status === status.UNAUTHORIZED) {
        resetAccount();
      } else if (error.code === 'ERR_NETWORK') {
        updateErrorType('ERR_NETWORK', routesName.NETWORK_ERROR);

        addError('ERR_NETWORK');
      } else if (error.response?.status === status.INTERNAL_SERVER_ERROR) {
        updateErrorType('INTERNAL_SERVER_ERROR', routesName.INTERNAL_SERVER_ERROR);

        addError('INTERNAL_SERVER_ERROR');
      }

      if (error.response?.data.ERROR_ID) {
        const ERROR_ID = error.response?.data.ERROR_ID;

        addError(ERROR_ID);
      }

			 return [null, error];
		 }
		 throw error;
  }
}

export default InterceptorResponseAxios;
