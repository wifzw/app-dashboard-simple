<template>
	<v-container fluid class="pa-0">
		<v-card class="elevation-0" width="100%" height="100%">
			<v-card-title class="px-2 px-sm-6">
				<customer-toolbar />
			</v-card-title>

			<v-card-text class="px-2 px-sm-6 fill-content">
				<customer-data-table />
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CustomerToolbar from '../components/organisms/CustomerToolbar.vue';
import CustomerDataTable from '../components/organisms/CustomerDataTable.vue';

@Component({
  name: 'Customers',
  components: {
    CustomerToolbar,
    CustomerDataTable,
  },
})
export default class Customers extends Vue {}
</script>

<style lang="scss" scoped></style>
