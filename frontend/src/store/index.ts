import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import VuexPersistence from 'vuex-persist';
import { authentication as Authentication } from '@/modules/authentication/store';
import { customer as Customer } from '@/modules/customers/store';
import { configuration as Configuration } from '@/modules/configuration/store';
import { success as Success } from '@/modules/success/store';
import { error as Error } from '@/modules/errors/store';
import { RootState } from './types';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'app-project-demo',
  storage: window.localStorage,
  reducer: (state: RootState) => ({
    Authentication: state.Authentication,
    Configuration: state.Configuration,
  }),
});

const store: StoreOptions<RootState> = {
  modules: {
    Authentication,
    Customer,
    Configuration,
    Success,
    Error,
  },
  plugins: [vuexLocal.plugin],
};

export default new Vuex.Store<RootState>(store);
