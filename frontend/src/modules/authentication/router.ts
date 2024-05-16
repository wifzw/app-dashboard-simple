import { RouteConfig } from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

const authenticationRoute: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
];

export default authenticationRoute;
