<template>
	<div class="d-contents">
		<app-bar />

		<navigation-drawer />

		<v-main class="container-main">
			<router-view></router-view>

			<footer-copyright />
		</v-main>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import AppBar from '@/components/molecules/appBar/AppBar.vue';
import NavigationDrawer from '@/components/molecules/navigationDrawer/NavigationDrawer.vue';
import { Action, State } from 'vuex-class';
import { RootState, RootStateKeys } from '@/store/types';
import { actionTypes } from '@/modules/authentication/store/actions/action-types';
import { AxiosError, AxiosResponse } from 'axios';
import FooterCopyright from '@/components/molecules/footer/FooterCopyright.vue';

@Component({
  name: 'FactoryIndexSystem',
  components: {
    AppBar,
    NavigationDrawer,
    FooterCopyright,
  },
})
export default class FactoryIndexSystem extends Vue {
	@State((state: RootState) => state.Authentication.isAuthenticated)
	isAuthenticated?: boolean

	@Action(`${RootStateKeys.AUTHENTICATION}/${actionTypes.GET_PROFILE_USER}`)
	[actionTypes.GET_PROFILE_USER]!: () => Promise<[AxiosResponse | null, AxiosError | null]>

	mantisUrl = 'https://mantisdashboard.io/vue/auth/login1'

 	linkedinUrl = 'https://www.linkedin.com/in/kauan-motta/'

	@Watch('isAuthenticated', { deep: true })
 	handleUserLoggedChanges(isAuthenticated: boolean) {
	  if (!isAuthenticated) {
	    this.$router.push({ name: 'login' });
	  }
 	}

	async created(): Promise<void> {
	  await this[actionTypes.GET_PROFILE_USER]();
	}
}
</script>

<style lang="scss" scoped>
  .container-main {
		background-color: var(--v-mainBg-base) !important;
	}
</style>
