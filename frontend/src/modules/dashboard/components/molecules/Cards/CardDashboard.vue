<template>
	<v-card class="elevation-0 border">
		<v-card-title class="body-1">
			<h6 class="dashboard">{{ item.title }}</h6>
		</v-card-title>

		<v-card-subtitle class="d-flex flex-column">
			<h4 class="dashboard">{{ item.value }}</h4>

			<p class="mt-6 mb-0 dashboard">
				Você ganhou
				<span v-if="!!item.valueSeparator" :class="getColorSeparator">
					{{ item.valueSeparator }}
				</span> extras este ano
			</p>
		</v-card-subtitle>
	</v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICardDashboard } from './types';

@Component({
  name: 'CardDashboard',
})
export default class CardDashboard extends Vue {
	@Prop({ type: Object, required: true })
	item!: ICardDashboard

	get getColorSeparator(): string {
	  return `${this.item.colorSeparator}--text`;
	}
}
</script>

<style lang="scss" scoped></style>
