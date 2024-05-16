import { RouteConfig } from 'vue-router';
import routesName from '@/router/types';
import Dashboard from './views/Dashboard.vue';

const dashboardRoute: Array<RouteConfig> = [
  {
    path: '',
    name: routesName.DASHBOARD,
    component: Dashboard,
    meta: {
      requiresAuth: true,
    },
  },
];

export default dashboardRoute;
