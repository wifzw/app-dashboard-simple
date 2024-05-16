<template>
	<snackbar
		v-model="snackbar"
		left
		@input="() => handleRemoveError()"
	>
		<v-alert
			color="error"
      border="right"
      colored-border
      elevation="2"
			class="px-5 ma-0 error-alert"
    >
			<div v-if="actualError" class="d-flex flex-column justify-center error-container-text">
				<h6>{{ actualError.title }}</h6>

				<p class="mb-0 body-text">
					{{ actualError.subtitle }}
				</p>
			</div>

			<template #append>
				<button-icon icon="mdi-close" contentClass="py-1 px-4" @click="handleRemoveError()" />
			</template>

			<template #prepend>
				<v-icon color="error" class="mr-4">mdi-alert-octagon-outline</v-icon>
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
import { mutationTypes } from '@/modules/errors/store/mutations/mutation-types';
import { errorsMessage } from '@/i18n/errors/pt';

@Component({
  name: 'ErrorSnackbar',
  components: {
    ButtonIcon,
    Snackbar,
  },
})
export default class ErrorSnackbar extends Vue {
	@State((state: RootState) => state.Error.errors)
	errors!: string[];

	@Mutation(`${RootStateKeys.ERROR}/${mutationTypes.REMOVE_ERROR}`)
	[mutationTypes.REMOVE_ERROR]!: (indexError: number) => void

	snackbar = true

	get actualError() {
	  const FIRST_INDEX = 0; // actual error = first index

	  return errorsMessage[this.errors[FIRST_INDEX]];
	}

	handleRemoveError() {
	  const FIRST_INDEX = 0; // actual error = first index

	  this[mutationTypes.REMOVE_ERROR](FIRST_INDEX);

	  this.snackbar = false;
	}
}
</script>

<style lang="scss" scoped>
.error-alert {
	max-width: 500px;
	overflow: hidden;

	border-top-right-radius: 2px !important;
	border-bottom-right-radius: 2px !important;
}

::v-deep .v-snack__content {
	border-top-right-radius: 6px !important;
}

.error-container-text {
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
