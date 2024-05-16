<template>
  <v-app id="app">
    <router-view/>

		<load-components v-if="isAuthenticated" />

		<success-snackbar v-if="!!successes?.length"/>

		<error-snackbar v-if="!!errors?.length"/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { RootState } from './store/types';
import { IErrorType } from './modules/errors/store/types';
import loadComponents from './components/molecules/loadComponents.vue';
import routesName from './router/types';
import SuccessSnackbar from './modules/success/components/molecules/SuccessSnackbar.vue';
import ErrorSnackbar from './modules/errors/components/molecules/ErrorSnackbar.vue';

@Component({
  name: 'App',
  components: {
    loadComponents,
    SuccessSnackbar,
    ErrorSnackbar,
  },
})

export default class App extends Vue {
	@State((state: RootState) => state.Authentication.isAuthenticated)
	isAuthenticated!: boolean

	@State((state: RootState) => state.Success.successes)
	successes!: string[]

	@State((state: RootState) => state.Error.error)
	error?: IErrorType

	@State((state: RootState) => state.Error.errors)
	errors!: string[]

	@Watch('error', { deep: true }) onChangeError(errorType?: IErrorType) {
	  const routes = [
	    routesName.NETWORK_ERROR,
	    routesName.INTERNAL_SERVER_ERROR,
	    routesName.LOGIN,
	    routesName.REGISTER,
	  ];

	  if (errorType && !routes.includes(this.$route.name!)) {
	    this.$router.push({ name: errorType.route });
	  }
	}
}
</script>

<style lang="scss">

</style>
