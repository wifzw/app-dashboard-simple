<template>
	<v-menu
		:disabled="!showMenu"
		:top="topMenu"
		:bottom="bottomMenu"
		:offset-y="offsetYMenu"
		:nudge-top="nudgeTopMenu"
		:nudge-bottom="nudgeBottomMenu"
	>
		<template #activator="{ on: onMenu, attrs: attrsMenu }">
			<v-tooltip
					color="black"
					:top="topTooltip"
					:bottom="bottomTooltip"
					:disabled="!tooltipMessage"
				>
					<template #activator="{ on: onTooltip, attrs: attrsTooltip }">
						<v-btn
							v-ripple="false"
							:color="color || 'iconColor'"
							:loading="loading"
							:disabled="disabled"
							:rounded="false"
							v-on="{...onMenu, ...onTooltip}"
							v-bind="{ ...attrsMenu, ...attrsTooltip }"
							:class="contentClass"
							icon
							width="34px"
							height="34px"
							@click="handleClick()"
						>
							<v-icon>{{ icon }}</v-icon>
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
  name: 'ButtonIcon',
})
export default class ButtonIcon extends Vue {
	@Prop({ type: Boolean, default: undefined }) disabled?: boolean

	@Prop({ type: Boolean, default: undefined }) loading?: boolean

	@Prop({ type: String, default: undefined }) tooltipMessage?: string

	@Prop({ type: String, required: true }) icon!: string

	@Prop({ type: String, default: undefined }) contentClass?: string

	@Prop({ type: String, default: undefined }) color?: string

	@Prop({ type: Boolean, default: true }) topTooltip?: boolean

	@Prop({ type: Boolean, default: undefined }) bottomTooltip?: boolean

	@Prop({ type: Boolean, default: false }) showMenu?: boolean

	@Prop({ type: Boolean, default: undefined }) topMenu?: boolean

	@Prop({ type: Boolean, default: undefined }) bottomMenu?: boolean

	@Prop({ type: Boolean, default: undefined }) offsetYMenu?: boolean

	@Prop({ type: String, default: undefined }) nudgeTopMenu?: string

	@Prop({ type: String, default: undefined }) nudgeBottomMenu?: string

	handleClick() {
	  if (this.disabled) return; // fix: click button to html class attack

	  this.$emit('click');
	}
}
</script>

<style lang="scss" scoped>

</style>
