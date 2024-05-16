import { RouteConfig } from 'vue-router';
import authenticationRoute from '@/modules/authentication/router';
import dashboardRoute from '@/modules/dashboard/router';
import customerRoute from '@/modules/customers/router';
import errorRoutes from '@/modules/errors/router';
import FactoryIndexSystem from '../views/FactoryIndexSystem.vue';

const routes: Array<RouteConfig> = [
  ...authenticationRoute,
  ...errorRoutes,
  {
    path: '/',
    component: FactoryIndexSystem,
    children: [
      ...dashboardRoute,
      ...customerRoute,
    ],
    meta: { requiresAuth: true },
  },
];

export default routes;
