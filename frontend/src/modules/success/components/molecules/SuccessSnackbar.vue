<template>
	<snackbar
		v-model="snackbar"
		right
		@input="() => handleRemoveSuccess()"
	>
		<v-alert
			color="success"
      border="right"
      colored-border
      elevation="2"
			class="px-5 ma-0 success-alert"
    >
			<template #prepend>
				<v-icon color="success" class="mr-4">mdi-check-circle-outline</v-icon>
			</template>

			<div
				v-if="actualSuccess"
			 	class="d-flex flex-column justify-center success-container-text mr-2"
			>
				<h6>{{ actualSuccess.title }}</h6>

				<p class="mb-0 body-text">
					{{ actualSuccess.subtitle }}
				</p>
			</div>

			<template #append>
				<button-icon icon="mdi-close" contentClass="py-1 px-4" @click="handleRemoveSuccess()" />
			</template>
    </v-alert>
	</snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { RootState, RootStateKeys } from '@/store/types';
import ButtonIcon from '@/components/atoms/buttons/ButtonIcon.vue';
import Snackbar from '@/components/molecules/snackBar/Snackbar.vue';
import { mutationTypes } from '@/modules/success/store/mutations/mutation-types';
import { successesMessage } from '@/i18n/successes/pt';

@Component({
  name: 'SuccessSnackbar',
  components: {
    ButtonIcon,
    Snackbar,
  },
})
export default class SuccessSnackbar extends Vue {
	@State((state: RootState) => state.Success.successes)
	successes!: string[];

	@Mutation(`${RootStateKeys.SUCCESS}/${mutationTypes.REMOVE_SUCCESS}`)
	[mutationTypes.REMOVE_SUCCESS]!: (indexSuccess: number) => void

	snackbar = true

	get actualSuccess() {
	  const FIRST_INDEX = 0; // actual success = first index

	  return successesMessage[this.successes[FIRST_INDEX]];
	}

	handleRemoveSuccess() {
	  const FIRST_INDEX = 0; // actual success = first index

	  this[mutationTypes.REMOVE_SUCCESS](FIRST_INDEX);

	  this.snackbar = false;
	}
}
</script>

<style lang="scss" scoped>
.success-alert {
	max-width: 500px;
	overflow: hidden;

	border-top-right-radius: 2px !important;
	border-bottom-right-radius: 2px !important;
}

::v-deep .v-snack__content {
	border-top-right-radius: 6px !important;
}

.success-container-text {
	overflow: hidden;
	overflow-y: auto;

	h6 {
		font-size: 15px;
	}

	p {
		font-size: .75rem;
		width: 100%;
		word-break: break-all;
		max-height: 300px;
	}
}
</style>
