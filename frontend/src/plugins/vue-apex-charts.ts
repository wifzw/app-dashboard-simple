import Vue from 'vue';
import VueApexCharts from 'vue-apexcharts';
import { VueConstructor } from 'vue/types/umd';

Vue.use(VueApexCharts);

Vue.component('ApexChart', VueApexCharts as VueConstructor<Vue>);
