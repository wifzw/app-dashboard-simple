<template>
	<dialog-factory
		title="Editar Cliente"
		subtitle="Preencha os dados com o máximo de informações"
		:open="open"
		:is-change-data="!notChanges"
		@close="handleCloseCustomer()"
		@click="handleUpdateCustomer()"
	>
		<template #default="{ invalid }">
			<v-container fluid>
				<v-row>
					<v-col cols="12" sm="6" class="pl-0 py-1">
						<input-text-field
							v-model="form.full_name"
							label="Nome Completo"
							rules="required|min:5"
							outlined
							prependInnerIcon="mdi-account-details"
						/>
					</v-col>

					<v-col cols="12" sm="6" class="pl-0 py-1">
						<input-text-field
							v-model="form.birth_date"
							v-mask="['##/##/####']"
							label="Date de Nascimento"
							rules="required|birth_date"
							outlined
							prependInnerIcon="mdi-calendar-range"
						/>
					</v-col>

					<v-col cols="12" class="pl-0 py-1">
						<input-text-field
							v-model="form.email"
							label="Email"
							rules="required|email"
							:suffix="getSuffixEmail"
							outlined
							prependInnerIcon="mdi-email-outline"
						/>
					</v-col>

					<v-col cols="12" class="pl-0 py-1">
						<input-text-field
							v-model="form.phone"
							v-mask="['(##) #####-####']"
							label="Celular"
							rules="required"
							placeholder="(49) 99984-2239"
							outlined
							prependInnerIcon="mdi-cellphone"
						/>
					</v-col>

					<v-col cols="12" class="pl-0">
						<button-default
							color="primary"
							type="submit"
							:loading="loading"
							:disabled="invalid || notChanges"
							contentClass="button-registers elevation-0"
							block
						>
							<p class="ma-0 py-4">Atualizar Cliente</p>
						</button-default>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</dialog-factory>
</template>

<script lang="ts">
import { RootState, RootStateKeys } from '@/store/types';
import {
  Component, Prop, Vue,
} from 'vue-property-decorator';
import { Action, Mutation, State } from 'vuex-class';
import { mutationTypes as mutationTypesOfCustomers } from '@/modules/customers/store/mutations/mutation-types';
import { actionTypes as actionTypesOfCustomers } from '@/modules/customers/store/actions/action-types';
import DialogFactory from '@/components/molecules/dialog/DialogFactory.vue';
import InputTextField from '@/components/atoms/inputs/InputTextField.vue';
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import { ICustomerPayload, ICustomerResponse } from '@/modules/customers/store/types';
import { PromiseInterceptorResponseType } from '@/axios/helpers/types';
import { DISABLE, ENABLE } from '@/utils/constants/generics';
import compareObjectSimple from '@/utils/functions/compareObjectSimple';
import status from '@/utils/constants/status';

@Component({
  name: 'UpdateCustomer',
  components: {
    DialogFactory,
    InputTextField,
    ButtonDefault,
  },
})

export default class UpdateCustomer extends Vue {
	@Prop({ type: Boolean, default: true }) open!: boolean;

	@State((state: RootState) => state.Customer.selectedCustomer)
	selectedCustomer!: ICustomerResponse

	form: ICustomerPayload = {
	  full_name: '',
	  birth_date: '',
	  email: '',
	  phone: '',
	}

	initialForm: ICustomerPayload = {
	  full_name: '',
	  birth_date: '',
	  email: '',
	  phone: '',
	}

	loading = false

	isChange = false

	isMapping = false

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.SET_OPEN_UPDATE_MODAL}`)
	[mutationTypesOfCustomers.SET_OPEN_UPDATE_MODAL]!: (value: boolean) => void;

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.RESET_SELECTED_CUSTOMER}`)
	[mutationTypesOfCustomers.RESET_SELECTED_CUSTOMER]!: () => void

	@Action(`${RootStateKeys.CUSTOMER}/${actionTypesOfCustomers.UPDATE_CUSTOMER}`)
	[actionTypesOfCustomers.UPDATE_CUSTOMER]!: (data: { id: string, payload: ICustomerPayload }) =>
	PromiseInterceptorResponseType<ICustomerResponse, unknown>

	get getSuffixEmail() {
	  return !this.form.email.includes('@') ? '@email.com' : undefined;
	}

	get notChanges(): boolean {
	  return !!compareObjectSimple(this.form, this.initialForm);
	}

	created() {
	  this.handleMappingDataPayload();
	}

	destroyed() {
	  this[mutationTypesOfCustomers.RESET_SELECTED_CUSTOMER]();
	}

	handleCloseCustomer() {
	  this[mutationTypesOfCustomers.SET_OPEN_UPDATE_MODAL](false);
	}

	handleMappingDataPayload() {
	  const forbiddenKey = ['id', 'created_at', 'updated_at', 'deleted_at', 'status'];

	  for (const [key, value] of Object.entries(this.selectedCustomer)) {
	    if (!forbiddenKey.includes(key)) {
	      this.form[key as keyof ICustomerPayload] = value;
	      this.initialForm[key as keyof ICustomerPayload] = value;
	    }
	  }
	}

	async handleUpdateCustomer(): Promise<void> {
	  this.loading = ENABLE;

	  const [response] = await this[actionTypesOfCustomers.UPDATE_CUSTOMER]({
	    id: this.selectedCustomer.id,
	    payload: this.form,
	  });

	  if (response?.status === status.SUCCESS) {
	    this.handleCloseCustomer();
	  }

	  this.loading = DISABLE;
	}
}
</script>

<style lang="scss" scoped></style>
