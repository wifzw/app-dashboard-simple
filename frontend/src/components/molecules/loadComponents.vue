<template>
	<div class="d-contents">
		<create-customer
			v-if="isCreateCustomerModal"
			:open="isCreateCustomerModal"
		/>

		<update-customer
			v-if="isUpdateCustomerModal"
			:open="isUpdateCustomerModal"
		/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { RootState } from '@/store/types';
import CreateCustomer from '@/modules/customers/components/molecules/CreateCustomer/CreateCustomer.vue';
import UpdateCustomer from '@/modules/customers/components/molecules/UpdateCustomer/UpdateCustomer.vue';

@Component({
  name: 'loadComponents',
  components: {
    CreateCustomer,
    UpdateCustomer,
  },
})
export default class loadComponents extends Vue {
	@State((state: RootState) => state.Customer.isCreateCustomerModal)
	isCreateCustomerModal!: boolean

	@State((state: RootState) => state.Customer.isUpdateCustomerModal)
	isUpdateCustomerModal!: boolean
}
</script>

<style lang="scss" scoped></style>
