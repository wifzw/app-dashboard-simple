<template>
	<v-footer absolute class="justify-center fill-width">
		<div class="v-card-item-subtitle">inspired by
			<a :href="mantisUrl" target="_blank" style="text-decoration: none;">
				Mantis
			</a>
			| made by
			<a :href="linkedinUrl" target="_blank" style="text-decoration: none;">
				Kauan Motta
			</a>
		</div>
	</v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'FooterCopyright',
})
export default class FooterCopyright extends Vue {
	mantisUrl = 'https://mantisdashboard.io/vue/auth/login1'

 	linkedinUrl = 'https://www.linkedin.com/in/kauan-motta/'
}
</script>

<style lang="scss" scoped>

</style>
