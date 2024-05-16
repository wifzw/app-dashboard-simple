<template>
	<v-container class="px-md-6 px-lg-12 py-md-8" fluid>
		<dashboard-charts />

		<unique-visitor />
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DashboardCharts from '../components/molecules/Charts/Dashboard.vue';
import UniqueVisitor from '../components/molecules/Charts/UniqueVisitor.vue';

@Component({
  name: 'Dashboard',
  components: {
    DashboardCharts,
    UniqueVisitor,
  },
})
export default class Dashboard extends Vue {

}
</script>

<style lang="scss" scoped></style>
