import { IErrorsMessages } from '../index';

const AUTHENTICATION_TITLE = 'Autenticação';
const REGISTER_TITLE = 'Registro';

const authenticationErrorMessagesPt: IErrorsMessages = {
  REGISTER_FIRST_NAME_REQUIRED: {
    title: REGISTER_TITLE,
    subtitle: 'O primeiro nome é obrigatório',
  },
  REGISTER_FIRST_NAME_MIN_LENGTH: {
    title: REGISTER_TITLE,
    subtitle: 'O primeiro nome precisa ter pelo menos 4 dígitos',
  },
  REGISTER_LAST_NAME_REQUIRED: {
    title: REGISTER_TITLE,
    subtitle: 'O sobrenome é obrigatório',
  },
  REGISTER_LAST_NAME_MIN_LENGTH: {
    title: REGISTER_TITLE,
    subtitle: 'O sobrenome precisa ter pelo menos 4 dígitos',
  },
  REGISTER_EMAIL_REQUIRED: {
    title: REGISTER_TITLE,
    subtitle: 'O email é obrigatório',
  },
  REGISTER_EMAIL_INVALID: {
    title: REGISTER_TITLE,
    subtitle: 'O email está no formato inválido (example@domain.com)',
  },
  REGISTER_EMAIL_ALREADY_USE: {
    title: REGISTER_TITLE,
    subtitle: 'O email já está sendo utilizado. Por favor utilize outro',
  },
  REGISTER_LOGIN_REQUIRED: {
    title: REGISTER_TITLE,
    subtitle: 'O login é obrigatório',
  },
  REGISTER_LOGIN_MIN_LENGTH: {
    title: REGISTER_TITLE,
    subtitle: 'O login precisa ter pelo menos 4 dígitos',
  },
  REGISTER_LOGIN_ALREADY_USE: {
    title: REGISTER_TITLE,
    subtitle: 'O login já está sendo utilizado. Por favor utilize outro',
  },
  REGISTER_PASSWORD_REQUIRED: {
    title: REGISTER_TITLE,
    subtitle: 'A senha é obrigatória',
  },
  USERNAME_OR_PASSWORD_INVALID: {
    title: AUTHENTICATION_TITLE,
    subtitle: 'Usuário ou senha inválido',
  },
};

export default authenticationErrorMessagesPt;
