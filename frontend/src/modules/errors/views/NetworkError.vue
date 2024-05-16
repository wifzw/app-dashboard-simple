<template>
	<v-container fluid class="fill-content mainBg">
		<v-row no-gutters align-content="center" class="fill-content">
			<v-col cols="12" class="justify-center">
				<div class="d-flex justify-center">
					<div class="image-illustration">
						<v-img
							:src="imageUrl"
							width="100%"
							height="100%"
							alt="Image Illustration"
						/>
					</div>
				</div>
			</v-col>

			<v-col cols="12" class="justify-center pt-2">
				<div class="d-flex justify-center">
					<h4 class="text-h4">
						Servidor Indisponível
					</h4>
				</div>
			</v-col>

			<v-col cols="12" class="justify-center pt-3 pb-4">
				<div class="d-flex justify-center">
					<div class="d-flex justify-center" style="max-width: 650px;">
						<p class="mb-0 text-center" style="width: 45%">
							Tente voltar para a página, caso ocorra
							novamente por favor acione o suporte que iremos te ajudar.
						</p>
					</div>
				</div>
			</v-col>

			<v-col cols="12" class="justify-center pt-2">
				<div class="d-flex justify-center">
					<button-default
						color="primary"
						contentClass="button-registers elevation-0"
						@click="handleNextRouteDashboard"
					>
						<p class="py-2 ma-0">Voltar para o inicio</p>
					</button-default>
				</div>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import routesName from '@/router/types';

@Component({
  name: 'NetworkError',
  components: {
    ButtonDefault,
  },
})
export default class NetworkError extends Vue {
	imageUrl = 'https://mantisdashboard.io/assets/Error500-4792f0d9.png'

	handleNextRouteDashboard() {
	  if (this.$route.query.route) {
	    this.$router.back();
	  } else {
	    this.$router.push({ name: routesName.DASHBOARD });
	  }
	}
}
</script>

<style lang="scss" scoped>
.image-illustration {
	width: 400px;
}
</style>
