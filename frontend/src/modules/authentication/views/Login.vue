<template>
  <v-container fluid class="container-register pa-0">
		<div
			class="d-md-flex d-block fill-content align-sm-center justify-sm-center"
		>
			<v-card
				:class="['elevation-0', { 'card-container': $vuetify.breakpoint.mdAndUp}]"
				width="100%"
				:height="$vuetify.breakpoint.xsOnly ? '100%' : undefined"
				max-width="1000px"
			>
				<v-card-text class="px-4">
					<v-row class="align-sm-center">
						<v-col cols="12" md="6" class="order-2 order-md-first">
							<form-observer @click="handleSubmitLogin()" class="d-contents">
								<template #default="{ invalid }">
									<v-row>
										<v-col cols="12">
											<input-text-field
												v-model="form.login"
												label="Login"
												rules="required"
												auto-complete="login"
											/>
										</v-col>

										<v-col cols="12">
											<input-text-field
												v-model="form.password"
												label="Senha"
												rules="required"
												:type="showPassword ? 'text' : 'password'"
												:appendIcon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
												auto-complete="current-password"
												@click:append="showPassword = !showPassword"
											/>
										</v-col>

										<v-col cols="12">
											<span class="d-flex justify-end body-1">
												Não tem uma conta?&nbsp;
												<router-link :to="{ name: 'register'}" style="text-decoration: none;">
													Cadastre-se
												</router-link>
											</span>
										</v-col>

										<v-col cols="12" class="fill-width">
											<button-default
												color="primary"
												tooltipMessage="Login"
												:disabled="invalid"
												:loading="loading"
												type="submit"
												contentClass="button-registers elevation-0"
												block
											>
												<p class="py-2 ma-0">Login</p>
											</button-default>
										</v-col>
									</v-row>
								</template>
							</form-observer>
						</v-col>

						<v-col cols="12" md="6" class="d-flex justify-center">
							<v-img
							  src="@/assets/login-illustrator.jpg"
								alt="Ilustração"
								width="100%"
								height="100%"
								max-width="450px"
							/>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</div>
	</v-container>
</template>

<script lang="ts">
import FormObserver from '@/components/molecules/form/FormObserver.vue';
import InputTextField from '@/components/atoms/inputs/InputTextField.vue';
import { Component, Vue } from 'vue-property-decorator';
import ButtonDefault from '@/components/atoms/buttons/ButtonDefault.vue';
import { Action } from 'vuex-class';
import { RootStateKeys } from '@/store/types';
import { actionTypes as actionTypesOfAuth } from '@/modules/authentication/store/actions/action-types';
import { AxiosError, AxiosResponse } from 'axios';
import { ILoginPayload } from '../store/types';

@Component({
  name: 'Login',
  components: {
    FormObserver,
    InputTextField,
    ButtonDefault,
  },
})

export default class Login extends Vue {
	@Action(`${RootStateKeys.AUTHENTICATION}/${actionTypesOfAuth.LOG_IN}`)
	[actionTypesOfAuth.LOG_IN]!: (payload: ILoginPayload) =>
	Promise<[AxiosResponse | null, AxiosError | null]>

	form: ILoginPayload = {
	  login: '',
	  password: '',
	}

	showPassword = false

	loading = false

	async handleSubmitLogin(): Promise<void> {
	  this.loading = true;

	  const [response] = await this[actionTypesOfAuth.LOG_IN](this.form);

	  if (response) {
	    this.$router.push({ name: 'index.dashboard' });
	  }

	  this.loading = false;
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/Login/login.scss';
</style>
