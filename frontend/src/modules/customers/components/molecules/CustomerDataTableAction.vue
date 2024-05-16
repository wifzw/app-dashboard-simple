<template>
	<div class="d-contents">
		<button-icon
			icon="mdi-pencil-outline"
			tooltipMessage="Editar Cliente"
			class="mr-2"
			@click="() => handleUpdateCustomerModal(customer)"
		/>

		<button-icon
			color="error"
			icon="mdi-delete-outline"
			tooltipMessage="Remover Cliente"
			@click="alertConfirmation = true"
		/>

		<dialog-confirmation
			v-if="alertConfirmation"
			:open="alertConfirmation"
			title="Cliente"
			subtitle="Você tem certeza que deseja remover esse cliente?"
			@close="alertConfirmation = false"
			@click:action="() => handleRemoveCustomer(customer.id)"
		/>
	</div>
</template>

<script lang="ts">
import { RootStateKeys } from '@/store/types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import { mutationTypes as mutationTypesOfCustomers } from '@/modules/customers/store/mutations/mutation-types';
import { actionTypes as actionTypesOfCustomers } from '@/modules/customers/store/actions/action-types';
import { PromiseInterceptorResponseType } from '@/axios/helpers/types';
import { ENABLE } from '@/utils/constants/generics';
import ButtonIcon from '@/components/atoms/buttons/ButtonIcon.vue';
import DialogConfirmation from '@/components/molecules/dialog/DialogConfirmation.vue';
import { ICustomerResponse } from '../../store/types';

@Component({
  name: 'CustomerDataTableAction',
  components: {
    ButtonIcon,
    DialogConfirmation,
  },
})
export default class CustomerDataTableAction extends Vue {
	@Prop({ type: Object, required: true }) customer!: ICustomerResponse

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.SET_OPEN_UPDATE_MODAL}`)
	[mutationTypesOfCustomers.SET_OPEN_UPDATE_MODAL]!: (value: boolean) => void

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.SET_SELECTED_CUSTOMER}`)
	[mutationTypesOfCustomers.SET_SELECTED_CUSTOMER]!: (customer: ICustomerResponse) => void

	@Action(`${RootStateKeys.CUSTOMER}/${actionTypesOfCustomers.DELETE_CUSTOMER}`)
	[actionTypesOfCustomers.DELETE_CUSTOMER]!: (id: string) =>
	PromiseInterceptorResponseType<unknown, unknown>

	alertConfirmation = false

	handleUpdateCustomerModal(customer: ICustomerResponse) {
	  this[mutationTypesOfCustomers.SET_SELECTED_CUSTOMER](customer);
	  this[mutationTypesOfCustomers.SET_OPEN_UPDATE_MODAL](ENABLE);
	}

	async handleRemoveCustomer(id: string): Promise<void> {
	  await this[actionTypesOfCustomers.DELETE_CUSTOMER](id);
	}
}
</script>

<style lang="scss" scoped></style>
