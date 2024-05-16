import routesName from '@/router/types';
import { RouteConfig } from 'vue-router';
import store from '@/store';
import InternalServerError from './views/InternalServerError.vue';
import NetworkError from './views/NetworkError.vue';
import NotFound from './views/NotFound.vue';

const errorRoutes: Array<RouteConfig> = [
  {
    path: '/internal-server-error',
    name: routesName.INTERNAL_SERVER_ERROR,
    component: InternalServerError,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (_, from, next) => {
      const { error } = store.state.Error;

      if (!error) {
        const route = from.name ?? routesName.DASHBOARD;

        next({ name: route });
      }

      next();
    },
  },
  {
    path: '/network-error',
    name: routesName.NETWORK_ERROR,
    component: NetworkError,
    meta: {
      requiresAuth: true,
    },
    beforeEnter: (_, from, next) => {
      const { error } = store.state.Error;

      if (!error) {
        const route = from.name ?? routesName.DASHBOARD;

        next({ name: route });
      }

      next();
    },
  },
  {
    path: '*',
    name: routesName.NOT_FOUND,
    component: NotFound,
    meta: {
      requiresAuth: true,
    },
  },
];

export default errorRoutes;
