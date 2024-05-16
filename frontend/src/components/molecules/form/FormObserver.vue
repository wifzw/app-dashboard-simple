<template>
	<validation-observer v-slot="{ invalid }" ref="observer" tag="div">
		<form @submit.prevent="submit(invalid)" class="form-observer-container">
			<slot :invalid="invalid" />
		</form>
	</validation-observer>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';

@Component({
  name: 'FormObserver',
})

export default class FormObserver extends Vue {
	@Ref('observer') refObserver!: {
		validate: () => Promise<boolean>
	}

	async submit(invalid: boolean): Promise<void> {
	  if (invalid) return;

	  const isValid = await this.refObserver.validate();

	  if (isValid) {
	    this.$emit('click');
	  }
	}
}
</script>

<style lang="scss" scoped>

</style>
