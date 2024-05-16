export interface ICustomerPayload {
	full_name: string;
	birth_date: string;
	email: string;
	phone: string;
}

export interface ICustomerStatusPayload {
	status: boolean
}

export interface ICustomerResponse {
	id: string;
	full_name: string;
	birth_date: string;
	email: string;
	phone: string;
	created_at: string;
	updated_at: string;
	deleted_at: null | string;
}

export interface ICustomerData {
	data: ICustomerResponse[]
	loading: boolean,
	filters: {
		search: null | string,
	}
}

export interface CustomerState {
	isCreateCustomerModal: boolean
	isUpdateCustomerModal: boolean
	customers: ICustomerData
	selectedCustomer?: ICustomerResponse
}
