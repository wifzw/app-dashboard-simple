<template>
	<v-data-table
		:headers="getHeaders"
		:items="getCustomers"
		:loading="customers.loading"
		:search="customers.filters.search"
		:page="currentPage"
		:items-per-page="itemsPerPage"
		item-key="id"
		show-select
	>
		<template #[`item.status`]="{ item }">
			<v-switch
				v-model="item.status"
				@change="() => handleUpdateStatusCustomer({ status: item.status, id: item.id })"
			/>
		</template>

		<template #[`item.action`]="{ item }">
			<customer-data-table-action :customer="item" />
		</template>

		<template #[`footer.prepend`]>
			<v-pagination
				v-if="getTotalPages > 1"
			 	v-model="currentPage"
			 	:length="getTotalPages"
			 	total-visible="8"
			/>
		</template>
	</v-data-table>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { DataTableHeader } from 'vuetify';
import { RootState, RootStateKeys } from '@/store/types';
import { Action, State } from 'vuex-class';
import { actionTypes as actionTypesOfCustomers } from '@/modules/customers/store/actions/action-types';
import ButtonIcon from '@/components/atoms/buttons/ButtonIcon.vue';
import { PromiseInterceptorResponseType } from '@/axios/helpers/types';
import { ICustomerData, ICustomerResponse, ICustomerStatusPayload } from '../../store/types';
import CustomerDataTableAction from '../molecules/CustomerDataTableAction.vue';

@Component({
  name: 'CustomerDataTable',
  components: {
    ButtonIcon,
    CustomerDataTableAction,
  },
})

export default class CustomerDataTable extends Vue {
	@State((state: RootState) => state.Customer.customers)
	customers!: ICustomerData

	@Action(`${RootStateKeys.CUSTOMER}/${actionTypesOfCustomers.GET_CUSTOMERS}`)
	[actionTypesOfCustomers.GET_CUSTOMERS]!: () =>
	PromiseInterceptorResponseType<ICustomerResponse[], unknown>

	@Action(`${RootStateKeys.CUSTOMER}/${actionTypesOfCustomers.UPDATE_STATUS_CUSTOMER}`)
	[actionTypesOfCustomers.UPDATE_STATUS_CUSTOMER]!:
	(data: { id: string, payload: ICustomerStatusPayload }) =>
	PromiseInterceptorResponseType<ICustomerResponse, unknown>

	currentPage = 1

	itemsPerPage = 10

	getHeaders: DataTableHeader[] = [
	  {
	    text: 'Nome',
	    value: 'full_name',
	  },
	  {
	    text: 'Email',
	    value: 'email',
	  },
	  {
	    text: 'Contato',
	    value: 'phone',
	  },
	  {
	    text: 'Status',
	    value: 'status',
	  },
	  {
	    text: '',
	    align: 'end',
	    value: 'action',
	    sortable: false,
	    width: '100px',
	  },
	]

	get getCustomers(): ICustomerResponse[] {
	  const search =	typeof this.customers.filters.search === 'string'
	    ? this.customers.filters.search.toLowerCase() : undefined;

	  return this.customers.data.filter((customer) => {
	    if (!search) return true;

	    const values = Object.values(customer);

	   	return !!values.find((value) => typeof value === 'string' && !!value.toLowerCase().includes(search));
	  });
	}

	get getTotalPages(): number {
	  return Math.ceil(this.getCustomers.length / this.itemsPerPage);
	}

	get getItems() {
	  return [];
	}

	async created(): Promise<void> {
	 await this[actionTypesOfCustomers.GET_CUSTOMERS]();
	}

	async handleUpdateStatusCustomer({ status, id }:
	{ status: boolean, id: string }): Promise<void> {
	  const payload = { status };

	  await this[actionTypesOfCustomers.UPDATE_STATUS_CUSTOMER]({ id, payload });
	}
}
</script>

<style lang="scss" scoped></style>
