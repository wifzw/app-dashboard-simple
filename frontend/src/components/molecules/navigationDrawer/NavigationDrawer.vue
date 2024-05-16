<template>
	<v-navigation-drawer
		v-model="getValueNavigationDrawer"
		app
		class="elevation-0"
		:width="$vuetify.breakpoint.smAndDown ? undefined : '256px'"
		:temporary="$vuetify.breakpoint.mdAndDown"
		:mini-variant="getMiniVariant"
		:key="drawerRefreshKey"
	>
		<template #prepend>
			<div :class="{ 'pa-5': !getMiniVariant }">
				<div :class="{ 'pl-2': !getMiniVariant, 'logo-container': getMiniVariant }">
					<v-img
						v-if="!getMiniVariant"
						src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light-text.svg"
						max-width="118px"
						max-height="35px"
					/>

					<v-img
						v-else
						src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-light.svg"
					/>
				</div>
			</div>
		</template>

		<list-group-factory :items="items" />

		<template #append>
			<div
				class="d-flex align-center pa-4"
				:class="{'px-2': getMiniVariant}"
				style="border-top: 2px solid var(--v-borderColor-base);"
			>
				<div class="d-flex mr-2">
					<v-avatar size="38" class="mr-2">
						<img
							src="https://cdn.vuetifyjs.com/images/john.jpg"
							alt="John"
							width="100%"
							height="100%"
						/>
					</v-avatar>
				</div>

				<div class="d-flex flex-column justify-center">
					<h6 class="text-ellipsis">{{ getUser }}</h6>
					<p class="lightText text-body-2 ma-0">Fullstack Dev.</p>
				</div>

				<div class="d-flex ml-6">
					<button-icon
						icon="mdi-chevron-right"
						content-class="ml-3 py-1"
						show-menu
						top-menu
						nudge-top-menu="35"
					>
						<template #card>
							<v-card>
								<v-list dense class="py-0">
									<v-list-item class="px-2" @click="handleLogout()">
										<v-list-item-icon>
											<v-icon>mdi-logout</v-icon>
										</v-list-item-icon>

										<v-list-item-content>
											Sair
										</v-list-item-content>
									</v-list-item>
								</v-list>
							</v-card>
						</template>
					</button-icon>
				</div>
			</div>
		</template>
	</v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import ButtonIcon from '@/components/atoms/buttons/ButtonIcon.vue';
import routesName from '@/router/types';
import { IUserLogged } from '@/modules/authentication/store/types';
import { RootState, RootStateKeys } from '@/store/types';
import { Mutation, State } from 'vuex-class';
import { ConfigurationState } from '@/modules/configuration/store/types';
import { mutationTypes } from '@/modules/authentication/store/mutations/mutation-types';
import { mutationTypes as mutationTypesOfConfiguration } from '@/modules/configuration/store/mutations/mutation-types';
import { IListGroup } from '../listGroupExpand/types';
import ListGroupFactory from '../listGroupExpand/ListGroupFactory.vue';

@Component({
  name: 'NavigationDrawer',
  components: {
    ListGroupFactory,
    ButtonIcon,
  },
})
export default class NavigationDrawer extends Vue {
	@State((state: RootState) => state.Authentication.userLogged)
	userLogged?: IUserLogged

	@State((state: RootState) => state.Configuration)
	configuration!: ConfigurationState

	@Mutation(`${RootStateKeys.AUTHENTICATION}/${mutationTypes.LOGOUT}`)
	[mutationTypes.LOGOUT]!: () => void

	@Mutation(`${RootStateKeys.CONFIGURATION}/${mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN}`)
	[mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN]!: (value: boolean) => void

	drawerRefreshKey = 0

  mini = false

  refreshNeeded = false

	items: IListGroup[] = [
	  {
	    name: 'Applications',
	    items: [
	      {
	        title: 'Dashboard',
	        action: 'mdi-speedometer',
	        route: routesName.DASHBOARD,
	      },
	      {
	        title: 'Customers',
	        action: 'mdi-account-multiple',
	        route: routesName.CUSTOMER,
	      },
	    ],
	  },
	]

	get getValueNavigationDrawer() {
	  return this.configuration.navigationDrawer.openNavigationDrawer;
	}

	set getValueNavigationDrawer(value: boolean) {
	  this[mutationTypesOfConfiguration.UPDATE_NAVIGATION_DRAWER_VALUE_OPEN](value);
	}

	get getUser() {
	  return this.userLogged ? `${this.userLogged.first_name} ${this.userLogged.last_name}` : '';
	}

	get getMiniVariant() {
	  return this.configuration.navigationDrawer.miniVariant;
	}

	@Watch('configuration', { deep: true }) onChangeConfiguration() {
	  // re-calc app width & height
	  this.drawerRefreshKey += 1;

	  this.$nextTick(() => {
	    this.drawerRefreshKey = 0;
	  });
	}

	async handleLogout(): Promise<void> {
	  this[mutationTypes.LOGOUT]();

	  this.$router.push({ name: 'login' });
	}
}
</script>

<style lang="scss" scoped>
.text-ellipsis {
	max-width: 120px;
}

.logo-container {
	max-width: 50px;
	padding-top: 12px;
	padding-left: 6px
}
</style>
