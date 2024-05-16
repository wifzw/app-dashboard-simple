<template>
	<v-snackbar
		v-model="snackbarOpen"
		color="mainBg"
		:right="right"
		:left="left"
		content-class="pa-0 elevation-0"
		text
	>
			<slot />
	</v-snackbar>
</template>

<script lang="ts">
import {
  Component, Prop, VModel, Vue,
} from 'vue-property-decorator';

@Component({
  name: 'Snackbar',
})
export default class Snackbar extends Vue {
	@VModel({ type: Boolean, default: true }) snackbarOpen!: boolean

	@Prop({ type: Boolean, default: undefined }) right!: boolean

	@Prop({ type: Boolean, default: undefined }) left?: boolean
}
</script>

<style lang="scss" scoped>
::v-deep .v-snack__action {
	display: none !important;
}
</style>
