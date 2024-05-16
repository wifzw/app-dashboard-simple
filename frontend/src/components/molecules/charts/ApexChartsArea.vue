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
  name: 'ApexChartsArea',
})
export default class ApexChartsArea extends Vue {
	@Prop({ type: Object, required: true }) options!: IApexChartsOptions

	@Prop({ type: String, default: '900' }) width?: string

	@Prop({ type: String, default: '400' }) height?: string
}
</script>

<style lang="scss" scoped></style>
