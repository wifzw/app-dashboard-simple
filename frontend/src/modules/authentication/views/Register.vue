<template>
	<v-container fluid class="container-register pa-0">
		<div
			class="d-md-flex d-block fill-content align-sm-center justify-sm-center"
		>
			<v-card
				:class="['elevation-0', { 'card-container': $vuetify.breakpoint.mdAndUp}]"
				width="100%"
				max-width="1200px"
			>
				<v-card-text class="px-4">
					<v-row class="align-sm-center">
						<v-col cols="12" md="6" class="order-2 order-md-first">
							<form-observer @click="handleSubmitRegister()" class="d-contents">
								<template #default="{ invalid }">
									<v-row>
										<v-col cols="12" sm="6">
											<input-text-field
												v-model="form.first_name"
												label="Nome"
												rules="required|min:3"
												auto-complete="first_name"
											/>
										</v-col>

										<v-col cols="12" sm="6">
											<input-text-field
												v-model="form.last_name"
												label="Sobrenome"
												rules="required|min:3"
												auto-complete="last_name"
											/>
										</v-col>

										<v-col cols="12" sm="6">
											<input-text-field
												v-model="form.login"
												label="Login"
												rules="required|min:4"
												auto-complete="login"
											/>
										</v-col>

										<v-col cols="12" sm="6">
											<input-text-field
												v-model="form.email"
												label="E-mail"
												rules="required|email"
												:suffix="getSuffixEmail"
												auto-complete="email"
											/>
										</v-col>

										<v-col cols="12">
											<input-text-field
												v-model="form.password"
												name="password"
												label="Senha"
												rules="required|password|max:20"
												:type="showPassword ? 'text' : 'password'"
												:appendIcon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
												class="fill-width"
												auto-complete="current-password"
												mode="aggressive"
												@click:append="showPassword = !showPassword"
											/>
										</v-col>

										<v-col cols="12">
											<span class="d-flex justify-end body-1">
												Já tem uma conta?&nbsp;
												<router-link :to="{ name: 'login' }">
													Entrar
												</router-link>
											</span>
										</v-col>

										<v-col cols="12" class="fill-width">
											<button-default
												color="primary"
												tooltipMessage="Cadastrar"
												:disabled="invalid"
												:loading="loading"
												type="submit"
												contentClass="button-registers elevation-0"
												block
											>
												<p class="py-2 ma-0">Cadastrar</p>
											</button-default>
										</v-col>
									</v-row>
								</template>
							</form-observer>
						</v-col>

						<v-col cols="12" md="6" class="d-flex justify-center">
							<v-img
							  src="@/assets/register-illustrator.jpg"
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
import { Action, Mutation } from 'vuex-class';
import { RootStateKeys } from '@/store/types';
import { mutationTypes as mutationTypesOfAuth } from '@/modules/authentication/store/mutations/mutation-types';
import { actionTypes as actionTypesOfAuth } from '@/modules/authentication/store/actions/action-types';
import { AxiosError, AxiosResponse } from 'axios';
import { IRegisterPayload } from '../store/types';

@Component({
  name: 'Register',
  components: {
    FormObserver,
    InputTextField,
    ButtonDefault,
  },
})

export default class Register extends Vue {
	@Mutation(`${RootStateKeys.AUTHENTICATION}/${mutationTypesOfAuth.SET_IS_AUTHENTICATED}`)
	[mutationTypesOfAuth.SET_IS_AUTHENTICATED]!: (value: boolean) => void

	@Action(`${RootStateKeys.AUTHENTICATION}/${actionTypesOfAuth.SIGN_UP}`)
	[actionTypesOfAuth.SIGN_UP]!: (payload: IRegisterPayload) =>
		Promise<[AxiosResponse | null, AxiosError | null]>

	form: IRegisterPayload = {
	  email: '',
	  first_name: '',
	  last_name: '',
	  login: '',
	  password: '',
	}

	showPassword = false

	loading = false

	get getSuffixEmail() {
	  return !this.form.email.includes('@') ? '@email.com' : undefined;
	}

	async handleSubmitRegister(): Promise<void> {
	  this.loading = true;

	  const [response] = await this[actionTypesOfAuth.SIGN_UP](this.form);

	  if (response) {
	    this.$router.push({ name: 'login' });
	  }

	  this.loading = false;
	}
}
</script>

<style lang="scss" scoped>
@import '../styles/Register/register.scss';
</style>
