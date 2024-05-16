<template>
	<apex-chart
		:options="options"
		:series="options.series"
		:width="width"
		:height="height"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IApexChartsOptions } from './types';

@Component({
  name: 'ApexChartsBar',
})
export default class ApexChartsBar extends Vue {
	@Prop({ type: Object, required: true }) options!: IApexChartsOptions

	@Prop({ type: String, default: undefined }) width?: string

	@Prop({ type: String, default: '400' }) height?: string
}
</script>

<style lang="scss" scoped></style>
