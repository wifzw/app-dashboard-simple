<template>
	<v-row class="py-0">
		<v-col cols="12">
			<v-row>
				<v-col
					v-for="item in items"
					:key="item.title"
					cols="12"
					sm="6"
					md="3"
				>
					<card-dashboard :item="item" />
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ICardDashboard } from '../Cards/types';
import CardDashboard from '../Cards/CardDashboard.vue';

@Component({
  name: 'DashboardChart',
  components: {
    CardDashboard,
  },
})
export default class DashboardChart extends Vue {
	items: ICardDashboard[] = [
	  {
	    title: 'Total de Visualizações da Página',
	    value: '2,42,236',
	    valueSeparator: '30,000',
	    colorSeparator: 'info',
	  },
	  {
	    title: 'Total de Usuários',
	    value: '60,250',
	    valueSeparator: '9,500',
	    colorSeparator: 'success',
	  },
	  {
	    title: 'Ordem total',
	    value: '12,800',
	    valueSeparator: '10,000',
	    colorSeparator: 'warning',
	  },
	  {
	    title: 'Vendas totais',
	    value: '$40,078',
	    valueSeparator: '2,500',
	    colorSeparator: 'error',
	  },
	]
}
</script>

<style lang="scss" scoped></style>
