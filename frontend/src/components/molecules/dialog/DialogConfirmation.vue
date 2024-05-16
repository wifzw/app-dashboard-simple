<template>
	<v-dialog
    :value="open"
		persistent
		max-width="450"
		class="elevation-0"
		overlay-opacity="0.4"
  >
		<v-card class="elevation-0">
			<v-card-title>
				{{  title }}
			</v-card-title>

			<v-card-subtitle class="py-2">
				{{  subtitle }}
			</v-card-subtitle>

			<v-card-actions class="justify-end">
				<button-default
					color="textColor"
					contentClass="button-registers elevation-0 mr-2"
					@click="handleCloseDialog()"
				>
					<p class="py-2 ma-0">Cancelar</p>
				</button-default>

				<button-default
					color="error"
					contentClass="button-registers elevation-0"
					@click="handleClick()"
				>
					<v-icon v-if="!!iconAction" class="mr-2">{{ iconAction }}</v-icon>
					<p class="py-2 ma-0">{{ buttonAction }}</p>
				</button-default>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  name: 'DialogConfirmation',
  components: {
    ButtonDefault,
  },
})
export default class DialogConfirmation extends Vue {
  @Prop({ type: Boolean, default: true }) open!: boolean

	@Prop({ type: String, required: true }) title!: string

	@Prop({ type: String, required: true }) subtitle!: string

	@Prop({ type: String, default: 'mdi-delete-outline' }) iconAction?: string

	@Prop({ type: String, default: 'Remover' }) buttonAction?: string

	handleCloseDialog() {
	  this.$emit('close');
	}

	handleClick() {
	  this.$emit('click:action');
	  this.handleCloseDialog();
	}
}
</script>

<style lang="scss" scoped></style>
