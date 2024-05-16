import { RouteConfig } from 'vue-router';
import routesName from '@/router/types';
import Customers from './views/Customers.vue';

const customerRoute: Array<RouteConfig> = [
  {
    path: '/customers',
    name: routesName.CUSTOMER,
    component: Customers,
    meta: {
      requiresAuth: true,
    },
  },
];

export default customerRoute;
