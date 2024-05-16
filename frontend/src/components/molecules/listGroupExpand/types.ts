export interface IListItem {
	title: string;
	action?: string;
	items?: IListItem[];
	route?: string;
}

export interface IListGroup {
	name: string,
	items: IListItem[];
}
