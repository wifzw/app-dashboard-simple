import Vue from 'vue';
import VueRouter from 'vue-router';
import middleware from '@/middleware/middleware';
import routes from './modules';

Vue.use(VueRouter);

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
});

router.beforeEach(middleware);

export default router;
