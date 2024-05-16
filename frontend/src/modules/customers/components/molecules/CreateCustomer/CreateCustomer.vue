<template>
	<dialog-factory
		title="Novo Cliente"
		subtitle="Preencha os dados com o máximo de informações"
		:open="open"
		:is-change-data="getIsChangeData"
		@close="handleCloseCustomer()"
		@click="handleCreateCustomer()"
	>
		<template #default="{ invalid }">
			<v-container fluid>
				<v-row>
					<v-col cols="12" sm="6" class="pl-0 py-1">
						<input-text-field
							v-model="form.full_name"
							label="Nome Completo"
							rules="required"
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
							rules="required|phoneBR"
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
							:disabled="invalid"
							contentClass="button-registers elevation-0"
							block
						>
							<p class="ma-0 py-4">Cadastrar Cliente</p>
						</button-default>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</dialog-factory>
</template>

<script lang="ts">
import { RootStateKeys } from '@/store/types';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, Mutation } from 'vuex-class';
import { mutationTypes as mutationTypesOfCustomers } from '@/modules/customers/store/mutations/mutation-types';
import { actionTypes as actionTypesOfCustomers } from '@/modules/customers/store/actions/action-types';
import DialogFactory from '@/components/molecules/dialog/DialogFactory.vue';
import InputTextField from '@/components/atoms/inputs/InputTextField.vue';
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import { ICustomerPayload, ICustomerResponse } from '@/modules/customers/store/types';
import { PromiseInterceptorResponseType } from '@/axios/helpers/types';
import { DISABLE, ENABLE } from '@/utils/constants/generics';
import status from '@/utils/constants/status';

@Component({
  name: 'CreateCustomer',
  components: {
    DialogFactory,
    InputTextField,
    ButtonDefault,
  },
})
export default class CreateCustomer extends Vue {
	@Prop({ type: Boolean, default: true }) open!: boolean;

	form: ICustomerPayload = {
	  full_name: '',
	  birth_date: '',
	  email: '',
	  phone: '',
	}

	loading = false

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.SET_OPEN_CREATE_MODAL}`)
	[mutationTypesOfCustomers.SET_OPEN_CREATE_MODAL]!: (value: boolean) => void;

	@Action(`${RootStateKeys.CUSTOMER}/${actionTypesOfCustomers.CREATE_CUSTOMER}`)
	[actionTypesOfCustomers.CREATE_CUSTOMER]!: (payload: ICustomerPayload) =>
	PromiseInterceptorResponseType<ICustomerResponse, unknown>

	get getSuffixEmail() {
	  return !this.form.email.includes('@') ? '@email.com' : undefined;
	}

	get getIsChangeData() {
	  return !!Object.values(this.form).find((currentValue) => currentValue !== '');
	}

	handleCloseCustomer() {
	  this[mutationTypesOfCustomers.SET_OPEN_CREATE_MODAL](false);
	}

	async handleCreateCustomer(): Promise<void> {
	  this.loading = ENABLE;

	  const [response] = await this[actionTypesOfCustomers.CREATE_CUSTOMER](this.form);

	  if (response?.status === status.CREATED) {
	    this.handleCloseCustomer();
	  }

	  this.loading = DISABLE;
	}
}
</script>

<style lang="scss" scoped></style>
