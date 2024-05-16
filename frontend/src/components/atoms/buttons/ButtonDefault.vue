<template>
	<v-menu :disabled="!isMenu" offset-y :close-on-content-click="false">
		<template #activator="{ on: onMenu, attrs: attrsMenu }">
			<v-tooltip top :disabled="!tooltipMessage">
				<template #activator="{ on: onTooltip, attrs: attrsTooltip }">
					<v-btn
						:color="color"
						:class="['text-capitalize', getContentClass]"
						:text="isModeText"
						:loading="loading"
						:disabled="disabled"
						:block="block"
						v-on="{...onMenu, ...onTooltip}"
						v-bind="{ ...attrsMenu, ...attrsTooltip }"
						:type="type"
						@click="handleClick()"
					>
						<slot />
					</v-btn>
				</template>

				{{ tooltipMessage }}
			</v-tooltip>
		</template>

		<slot name="card" />
	</v-menu>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'ButtonDefault',
})
export default class ButtonDefault extends Vue {
	@Prop({ type: Boolean, default: undefined }) disabled?: boolean

	@Prop({ type: Boolean, default: undefined }) loading?: boolean

	@Prop({ type: String, default: undefined }) tooltipMessage?: string

	@Prop({ type: String, default: undefined }) type?: string

	@Prop({ type: Boolean, default: undefined }) isMenu?: boolean

	@Prop({ type: String, default: undefined }) isModeText?: string

	@Prop({ type: String, default: undefined }) contentClass?: string

	@Prop({ type: String, default: undefined }) color?: string

	@Prop({ type: Boolean, default: undefined }) block?: boolean

	get getContentClass(): string[] | undefined {
	  return this.contentClass ? [this.contentClass] : undefined;
	}

	handleClick() {
	  if (this.disabled) return; // fix: click button to html class attack

	  this.$emit('click');
	}
}
</script>

<style lang="scss" scoped></style>
