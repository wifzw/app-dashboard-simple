import authenticationErrorMessagesPt from './Authentication';
import customersErrorMessagesPt from './Customers';
import genericsErrorMessagesPt from './Generics';

export interface IErrosMessage {
	title: string;
	subtitle: string;
	text?: string;
}

export interface IErrorsMessages {
	[key: string]: IErrosMessage;
 }

export const errorsMessage: IErrorsMessages = {
  ...authenticationErrorMessagesPt,
  ...customersErrorMessagesPt,
  ...genericsErrorMessagesPt,
};
