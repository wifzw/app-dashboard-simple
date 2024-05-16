<template>
	<input-text-field
		v-model="search"
		:placeholder="placeholder"
		outlined
		dense
		contentClass="py-0"
		prepend-inner-icon="mdi-magnify"
		:min-width="$vuetify.breakpoint.smAndDown ? undefined : '250px'"
	/>
</template>

<script lang="ts">
import {
  Component, Prop, VModel, Vue,
} from 'vue-property-decorator';
import InputTextField from '@/components/atoms/inputs/InputTextField.vue';

@Component({
  name: 'InputSearch',
  components: {
    InputTextField,
  },
})
export default class InputSearch extends Vue {
	@VModel({ default: null }) search!: string

	@Prop({ type: String, default: undefined }) placeholder?: string
}
</script>

<style lang="scss" scoped></style>
