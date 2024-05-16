<template>
	<div class="d-flex align-center justify-space-between fill-width">
		<div class="d-flex">
			<input-search v-model="getSearch" placeholder="Buscar clientes" />
		</div>

		<div class="d-flex">
			<button-default
				color="primary"
				contentClass="button-registers elevation-0"
				@click="handleCreateCustomerModal()"
			>
				<v-icon :class="$vuetify.breakpoint.xsOnly ? 'mx-2 py-2' : 'mr-2'">mdi-plus</v-icon>
				<p v-if="!$vuetify.breakpoint.xsOnly" class="py-2 ma-0">Cadastrar Cliente</p>
			</button-default>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { RootState, RootStateKeys } from '@/store/types';
import { mutationTypes as mutationTypesOfCustomers } from '@/modules/customers/store/mutations/mutation-types';
import InputSearch from '@/components/atoms/inputs/InputSearch.vue';
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import { ICustomerData } from '../../store/types';

@Component({
  name: 'CustomerToolbar',
  components: {
    InputSearch,
    ButtonDefault,
  },
})
export default class CustomerToolbar extends Vue {
	@State((state: RootState) => state.Customer.customers)
	customers!: ICustomerData

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.SET_OPEN_CREATE_MODAL}`)
	[mutationTypesOfCustomers.SET_OPEN_CREATE_MODAL]!: (value: boolean) => void

	@Mutation(`${RootStateKeys.CUSTOMER}/${mutationTypesOfCustomers.UPDATE_SEARCH_CUSTOMER}`)
	[mutationTypesOfCustomers.UPDATE_SEARCH_CUSTOMER]!: (search: string | null) => void

	get getSearch(): string | null {
	  return this.customers.filters.search;
	}

	set getSearch(search: string | null) {
	  this[mutationTypesOfCustomers.UPDATE_SEARCH_CUSTOMER](search);
	}

	handleCreateCustomerModal() {
	  this[mutationTypesOfCustomers.SET_OPEN_CREATE_MODAL](true);
	}
}
</script>

<style lang="scss" scoped></style>
