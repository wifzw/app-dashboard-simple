import customerSuccessMessages from './Customers';
import authenticationSuccessMessages from './Authentication';

export interface ISuccessMessage {
	title: string;
	subtitle: string;
	text?: string;
}

export interface ISuccessesMessages {
	[key: string]: ISuccessMessage;
 }

export const successesMessage: ISuccessesMessages = {
  ...customerSuccessMessages,
  ...authenticationSuccessMessages,
};
