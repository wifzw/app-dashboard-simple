import Vue from 'vue';
import {
  ValidationObserver, ValidationProvider, Validator,
} from 'vee-validate';
import { VueConstructor } from 'vue/types/umd';
import PT_BR from '@/i18n/vee-validate/pt-br';
import { differenceInYears, parse } from 'date-fns';

Validator.localize('pt-br', PT_BR);

Validator.extend('birth_date', {
  validate: (value: string) => {
    const date = parse(value, 'dd/MM/yyyy', new Date());
		 const yearsDifference = differenceInYears(new Date(), date);
		 const AGE_MINIMUM = 18;
		 return !Number.isNaN(date.getTime()) && yearsDifference >= AGE_MINIMUM;
  },
});

Validator.extend('phoneBR', {
  validate: (value: string) => {
    if (!value) return false;

    const regexPhoneBR = /^(?:(?:\+|00)?(55)\s?)?(?:(?:\(?[1-9][0-9]\)?)?\s?)?(?:((?:9\d|[2-9])\d{3})-?(\d{4}))$/;

    return regexPhoneBR.test(value);
  },
});

Validator.extend('password', {
  validate: (value: string | null) => {
    if (!value) return false;

    const regexPasswordValidation = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    return regexPasswordValidation.test(value);
  },
});

Vue.component('ValidationObserver', ValidationObserver as VueConstructor<Vue>);
Vue.component('ValidationProvider', ValidationProvider as VueConstructor<Vue>);
