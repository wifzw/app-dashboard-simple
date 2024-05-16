<template>
	<validation-provider
		v-slot="{ errors }"
		tag="div"
		:name="name"
		:mode="mode"
		:rules="rules"
		class="container-text-field"
	>
		<label v-if="label" class="body-1 mb-0">
			{{ label }}
			<span v-if="isRequired" class="error--text">
				*
			</span>
		</label>

		<v-text-field
			v-model="valueTextField"
			:type="type"
			:error-messages="errors"
			:hide-details="!errors.length"
			:dense="dense"
			:prepend-inner-icon="prependInnerIcon"
			:append-icon="appendIcon"
			:prefix="prefix"
			:suffix="suffix"
			:outlined="outlined"
			:label="labelTextField"
			:placeholder="placeholder"
			:autocomplete="autoComplete"
			:class="contentClass"
			:style="getStyle"
			@click:append="() => $emit('click:append')"
			@focusout="$emit('focusout')"
			@focusin="$emit('focusin')"
		/>
	</validation-provider>
</template>

<script lang="ts">
import {
  Component, Prop, VModel, Vue,
} from 'vue-property-decorator';

@Component({
  name: 'InputTextField',
})
export default class InputTextField extends Vue {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@VModel({ default: null }) valueTextField!: any;

	@Prop({ type: String, default: undefined }) label?: string;

	@Prop({ type: String, default: undefined }) readonly rules?: string;

	@Prop({ type: String, default: 'text' }) type?: string;

	@Prop({ type: String, default: undefined }) readonly name?: string;

	@Prop({ type: Boolean, default: undefined }) readonly dense?: boolean;

	@Prop({ type: String, default: undefined }) readonly appendIcon?: string;

	@Prop({ type: String, default: undefined }) readonly suffix?: string;

	@Prop({ type: String, default: undefined }) readonly prefix?: string;

	@Prop({ type: String, default: undefined }) readonly placeholder?: string;

	@Prop({ type: String, default: undefined }) readonly autoComplete?: string;

	@Prop({ type: Boolean, default: undefined }) readonly outlined?: boolean;

	@Prop({ type: String, default: undefined }) readonly contentClass?: string;

	@Prop({ type: String, default: undefined }) readonly prependInnerIcon?: string;

	@Prop({ type: String, default: undefined }) readonly minWidth?: string;

	@Prop({ type: String, default: undefined }) readonly maxWidth?: string;

	@Prop({ type: String, default: undefined }) readonly labelTextField?: string;

	@Prop({ type: String, default: 'eager' }) mode!: 'aggressive' | 'eager' | 'lazy';

	get getStyle(): string {
	  const minWidth = this.minWidth ?? 'inherit';
	  const maxWidth = this.maxWidth ?? 'inherit';

	  return `width: 100%; min-width: ${minWidth} !important; max-width: ${maxWidth} !important;`;
	}

	get isRequired(): boolean {
	  return !!this.rules?.includes('required');
	}
}
</script>

<style lang="scss" scoped>
.container-text-field {
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
}
</style>
