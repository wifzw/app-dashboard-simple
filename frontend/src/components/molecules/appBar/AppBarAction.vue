<template>
	<div class="d-flex align-center justify-space-between fill-width mt-1 mt-sm-0">
		<div class="d-flex align-center">
			<button-icon
				v-if="$vuetify.breakpoint.lgAndUp"
				:icon="!getMiniVariant ? 'mdi-menu-open' : 'mdi-menu-close'"
				contentClass="mx-3 py-1"
				:tooltip-message="`${!getMiniVariant ? 'Encolher' : 'Expandir'} menu`"
				bottom-tooltip
				@click="handleUpdateMiniVariant()"
			/>

			<button-icon
				v-else
				icon="mdi-menu"
				contentClass="mx-3 py-1"
				tooltip-message="Abrir menu"
				bottom-tooltip
				@click="handleOpenMenu()"
			/>

			<input-search v-model="search" />
		</div>

		<app-bar-action-icon v-if="$vuetify.breakpoint.smAndUp" />

		<app-bar-action-icon-mobile v-else />
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
import AppBarActionIcon from './AppBarActionIcon.vue';
import AppBarActionIconMobile from './AppBarActionIconMobile.vue';

@Component({
  name: 'AppBarAction',
  components: {
    ButtonIcon,
    ButtonDefault,
    InputSearch,
    AppBarActionIcon,
    AppBarActionIconMobile,
  },
})
export default class AppBarAction extends Vue {
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
