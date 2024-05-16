export interface ILoginPayload {
	login: string;
	password: string;
}

export interface IRegisterPayload {
	first_name: string;
	last_name: string;
	email: string;
	login: string;
	password: string;
}

export interface IUserLogged {
	id: string
  first_name: string
  last_name: string
  email: string
  created_at: string
  updated_at: string
  deleted_at: null | string
}

export interface AuthenticationState {
	isAuthenticated: boolean;
	userLogged?: IUserLogged;
	token: {
		type: 'Bearer',
		access_token?: string;
		refresh_token?: string;
	}
}
