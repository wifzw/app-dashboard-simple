<template>
	<div class="d-flex align-center mx-2">
		<button-icon icon="mdi-bell-outline" contentClass="ml-3 py-1" />

		<button-icon icon="mdi-fullscreen" contentClass="ml-3 py-1" />

		<button-icon icon="mdi-cog-outline" contentClass="ml-3 py-1" />

		<button-default is-mode-text is-menu contentClass="px-2 mx-2">
			<div class="d-flex align-center py-2">
				<v-avatar size="32" class="mr-2">
					<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" width="100%" height="100%" />
				</v-avatar>

				<p class="body-2 ma-0 secondary--text">
					{{ getUser }}
				</p>
			</div>

			<template #card>
				<v-card min-width="250px">
					<v-card-title>
						<div class="d-flex align-center">
							<div class="d-flex mr-2">
								<v-avatar size="38" class="mr-2">
									<img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" width="100%" height="100%" />
								</v-avatar>
							</div>

							<div class="d-flex flex-column justify-center">
								<h6>{{ getUser }}</h6>
								<p class="lightText text-body-2 ma-0">Fullstack Dev.</p>
							</div>

							<div class="d-flex ml-6">
								<button-icon
									icon="mdi-logout"
									tooltipMessage="Sair"
									contentClass="ml-3 py-1"
									bottom-tooltip
									@click="handleLogout()"
								/>
							</div>
						</div>
					</v-card-title>
				</v-card>
			</template>
		</button-default>
	</div>
</template>

<script lang="ts">
import ButtonIcon from '@/components/atoms/buttons/ButtonIcon.vue';
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import InputSearch from '@/components/atoms/inputs/InputSearch.vue';
import { Component, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import { RootState, RootStateKeys } from '@/store/types';
import { IUserLogged } from '@/modules/authentication/store/types';
import { mutationTypes } from '@/modules/authentication/store/mutations/mutation-types';
import { ConfigurationState } from '@/modules/configuration/store/types';
import { mutationTypes as mutationTypesOfConfiguration } from '@/modules/configuration/store/mutations/mutation-types';

@Component({
  name: 'AppBarActionIcon',
  components: {
    ButtonIcon,
    ButtonDefault,
    InputSearch,
  },
})
export default class AppBarActionIcon extends Vue {
	@State((state: RootState) => state.Authentication.userLogged)
	userLogged?: IUserLogged

	@State((state: RootState) => state.Configuration)
	configuration!: ConfigurationState

	@Mutation(`${RootStateKeys.AUTHENTICATION}/${mutationTypes.LOGOUT}`)
	[mutationTypes.LOGOUT]!: () => void

	@Mutation(`${RootStateKeys.CONFIGURATION}/${mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_MINI_VARIANT}`)
	[mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_MINI_VARIANT]!:
		(value: boolean) => void

	@Mutation(`${RootStateKeys.CONFIGURATION}/${mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN}`)
	[mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN]!: (value: boolean) => void

	search = ''

	get getUser() {
	  return this.userLogged
	    ? `${this.userLogged.first_name} ${this.userLogged.last_name}` : '';
	}

	get getMiniVariant() {
	  return this.configuration.navigationDrawer.miniVariant;
	}

	handleUpdateMiniVariant() {
	  const { miniVariant } = this.configuration.navigationDrawer;

	  this[mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_MINI_VARIANT](
	    !miniVariant,
	  );
	}

	handleOpenMenu() {
	  const value = !this.configuration.navigationDrawer.openNavigationDrawer;

	  this[mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN](value);
	}

	async handleLogout(): Promise<void> {
	  this[mutationTypes.LOGOUT]();

	  this.$router.push({ name: 'login' });
	}
}
</script>

<style lang="scss" scoped></style>
