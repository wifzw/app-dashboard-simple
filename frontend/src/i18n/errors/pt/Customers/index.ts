import { IErrorsMessages } from '../index';

const CUSTOMER_TITLE = 'Cliente';

const customersErrorMessagesPt: IErrorsMessages = {
  CUSTOMER_FULL_NAME_REQUIRED: {
    title: CUSTOMER_TITLE,
    subtitle: 'O nome completo é obrigatório',
  },
  CUSTOMER_FULL_NAME_MIN_LENGTH: {
    title: CUSTOMER_TITLE,
    subtitle: 'O nome completo precisa ter pelo menos 4 dígitos',
  },
  CUSTOMER_BIRTH_DATE_REQUIRED: {
    title: CUSTOMER_TITLE,
    subtitle: 'A data de nascimento é obrigatório',
  },
  CUSTOMER_BIRTH_DATE_INVALID: {
    title: CUSTOMER_TITLE,
    subtitle: 'A data de nascimento está no formato inválido',
  },
  CUSTOMER_EMAIL_REQUIRED: {
    title: CUSTOMER_TITLE,
    subtitle: 'O email é obrigatório',
  },
  CUSTOMER_EMAIL_INVALID: {
    title: CUSTOMER_TITLE,
    subtitle: 'O email está no formato inválido',
  },
  CUSTOMER_PHONE_REQUIRED: {
    title: CUSTOMER_TITLE,
    subtitle: 'O Contato é obrigatório',
  },
  CUSTOMER_PHONE_INVALID: {
    title: CUSTOMER_TITLE,
    subtitle: 'O número de contato está inválido',
  },
};

export default customersErrorMessagesPt;
