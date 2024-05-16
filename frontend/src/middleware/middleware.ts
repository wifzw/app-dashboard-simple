import { NavigationGuardNext, Route } from 'vue-router';
import store from '@/store';
import routesName from '@/router/types';

const routeMiddleware = async (
  to: Route,
  from: Route,
  next: NavigationGuardNext<Vue>,
): Promise<void> => {
  const { isAuthenticated } = store.state.Authentication;

  if (isAuthenticated) {
    if (!to.meta?.requiresAuth && to.name !== routesName.DASHBOARD) {
      next({ name: routesName.DASHBOARD });
    }

    next();
  } else if (to.meta?.requiresAuth && to.name !== routesName.LOGIN) {
    next({ name: routesName.LOGIN });
  } else {
    next();
  }
};

export default routeMiddleware;
