<template>
	<v-dialog
    :value="open"
		persistent
		max-width="750"
		class="elevation-0"
		overlay-opacity="0.4"
  >
    <v-card>
			<v-card-title class="justify-space-between">
				{{ title }}

				<button-icon
					icon="mdi-close"
					contentClass="py-2 px-5"
					tooltipMessage="Fechar"
					bottom-tooltip
					@click="handleVerificationIsChangeData()"
				/>
			</v-card-title>

			<v-card-subtitle v-if="!!subtitle" class="py-3">
				{{ subtitle }}
			</v-card-subtitle>

      <v-card-text>
        <form-observer @click="() => $emit('click')">
					<template #default="{ invalid }">
						<slot :invalid="invalid" />
					</template>
				</form-observer>
      </v-card-text>
    </v-card>

		<dialog-confirmation
			v-if="openAlertConfirmation"
			:open="openAlertConfirmation"
			title="Formulário"
			subtitle="Você tem alteração não salva, você realmente deseja fechar o formulário?"
			button-action="Fechar Formulário"
			:icon-action="null"
			@close="openAlertConfirmation = false"
			@click:action="() => $emit('close')"
		/>
  </v-dialog>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import ButtonIcon from '@/components/atoms/buttons/ButtonIcon.vue';
import routesName from '@/router/types';
import { RouteRecord } from 'vue-router';
import FormObserver from '../form/FormObserver.vue';
import DialogConfirmation from './DialogConfirmation.vue';

@Component({
  name: 'DialogFactory',
  components: {
    FormObserver,
    ButtonIcon,
    DialogConfirmation,
  },
})
export default class DialogFactory extends Vue {
  @Prop({ type: Boolean, default: true }) open!: boolean

	@Prop({ type: String, required: true }) title!: string

	@Prop({ type: String, default: undefined }) subtitle?: string

	@Prop({ type: Boolean, default: false }) isChangeData?: boolean

	openAlertConfirmation = false;

	@Watch('$route', { deep: true }) onChangeRoutes(route: RouteRecord) {
	  const routes = [routesName.INTERNAL_SERVER_ERROR, routesName.NETWORK_ERROR];

	  if (route?.name && routes.includes(route.name)) {
	    this.$emit('close');
	  }
	}

	mounted() {
	  window.addEventListener('keydown', this.closeOnEsc);
	}

	beforeDestroy() {
	  window.removeEventListener('keydown', this.closeOnEsc);
	}

	closeOnEsc(event: KeyboardEvent): void {
	  if (event.key === 'Escape') {
	    this.handleVerificationIsChangeData();
	  }
	}

	handleVerificationIsChangeData(): void {
	  if (this.isChangeData) {
	      this.openAlertConfirmation = true;
	    } else {
	      this.$emit('close');
	  }
	}
}
</script>

<style lang="scss" scoped></style>
