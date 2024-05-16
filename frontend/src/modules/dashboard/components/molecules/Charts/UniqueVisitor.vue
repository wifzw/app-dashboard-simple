<template>
	<v-row class="py-2">
		<v-col cols="12" md="8">
			<h5 class="dashboard mb-4">Visitante único</h5>

			<v-card
				class="elevation-0 border"
				style="max-width: 100%; overflow: hidden;"
			>
				<v-card-text>
					<apex-charts-area :options="optionsArea" :width="chartWidthArea"/>
				</v-card-text>
			</v-card>
		</v-col>

		<v-col cols="12" md="4">
			<h5 class="dashboard mb-4">Visão geral da receita</h5>

			<v-card
				class="elevation-0 border"
				style="max-width: 100%; overflow: hidden;"
			>
				<v-card-title>
					<h6 class="dashboard">Estatísticas desta semana</h6>
				</v-card-title>

				<v-card-subtitle class="py-2">
					<h4 class="dashboard">R$ 8.000,50</h4>
				</v-card-subtitle>

				<v-card-text>
					<apex-charts-bar :options="optionsBar" width="100%" height="335"/>
				</v-card-text>
			</v-card>
		</v-col>
	</v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApexChartsArea from '@/components/molecules/charts/ApexChartsArea.vue';
import ApexChartsBar from '@/components/molecules/charts/ApexChartsBar.vue';

@Component({
  name: 'UniqueVisitor',
  components: {
    ApexChartsArea,
    ApexChartsBar,
  },
})

export default class UniqueVisitor extends Vue {
	optionsArea = {
	  series: [{
	    name: 'Visualizações de página',
	    data: [0, 30, 60, 90, 120],
	  },
	  {
	    name: 'Sessões',
	    data: [0, 30, 150, 100, 120],
	  },
	  ],
	  chart: {
	    type: 'area',
	    fontFamily: 'Poppins, Arial, sans-serif',
	    toolbar: {
	      show: false,
	    },
	  },
	  dataLabels: {
	    enabled: false,
	  },
	  xaxis: {
	    type: 'category',
	    categories: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
	    labels: {
	      show: true,
	      hideOverlappingLabels: true,
	    },
	  },
	  grid: {
	    padding: {
	      right: 20,
	      left: 20,
	    },
	  },
	};

	optionsBar = {
	  series: [{
	    name: 'Data-Demo',
	    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
	  },
	  ],
	  chart: {
	    type: 'bar',
	    fontFamily: 'Poppins, Arial, sans-serif',
	    height: 350,
	    toolbar: {
	      show: false,
	    },
	  },
	  plotOptions: {
	    bar: {
	      horizontal: false,
	      columnWidth: '50%',
	      endingShape: 'rounded',
	    },
	  },
	  dataLabels: {
	    enabled: false,
	  },
	  xaxis: {
	    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
	  },
	  yaxis: {
	    show: false,
	  },
	  grid: {
	    show: false,
	  },
	};

	get chartWidthArea() {
	  if (this.$vuetify.breakpoint.lgAndUp) {
	    return '957px';
	  }

	  return '100%';
	}
}
</script>

<style lang="scss" scoped>

</style>
