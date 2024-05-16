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
						Página Não Encontrada
					</h4>
				</div>
			</v-col>

			<v-col cols="12" class="justify-center pt-6 pb-4">
				<div class="d-flex justify-center">
					<div class="d-flex justify-center" style="max-width: 650px;">
						<p class="mb-0 text-center" style="width: 55%">
							A página que você está vendo foi movida, removida, renomeada ou pode nunca existir!
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
  name: 'NotFound',
  components: {
    ButtonDefault,
  },
})
export default class NotFound extends Vue {
	imageUrl = 'https://mantisdashboard.io/assets/Error404-fc1d5475.png'

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
	width: 500px;
}
</style>
