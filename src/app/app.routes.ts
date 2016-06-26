import { Route, provideRouter } from '@angular/router';
import { HomeComponent } from './home';
import { UnfoundComponent } from './unfound';

import { AuthGuard } from './auth/auth.guard';

// AngularClass
import { provideWebpack } from '@angularclass/webpack-toolkit';
import { providePrefetchIdleCallbacks } from '@angularclass/request-idle-callback';

import { authRoutes, AUTH_PROVIDERS } from './auth/auth.routes';

import { CanDeactivateGuard } from './app.interfaces';

interface AppRouterConfig extends Route {
  data?: any;
}

export const topRoutes: Array<AppRouterConfig> = [
  { path: '', component: HomeComponent },
  { path: 'home',  component: HomeComponent },

  ...authRoutes,

  // make sure you match the component type string to the require in asyncRoutes
  { path: 'about', component: 'AboutComponent', data: {title: 'About'}, canActivate: [AuthGuard] },
  { path: '**',    component: UnfoundComponent, data: {title: 'Not Found (404)'} },
];

// Async load a component using Webpack's require with es6-promise-loader and webpack `require`
// asyncRoutes is needed for our @angularclass/webpack-toolkit that will allow us to resolve
// the component correctly
export const asyncRoutes: AsyncRoutes = {
  'AboutComponent': require('es6-promise-loader!./about')
};


// Optimizations for initial loads
// An array of callbacks to be invoked after bootstrap to prefetch async routes
export const prefetchRouteCallbacks: Array<Es6PromiseLoader | Function> = [
  asyncRoutes['AboutComponent'] // es6-promise-loader returns a function
];

// Es6PromiseLoader and AsyncRoutes interfaces are defined in custom-typings

export const APP_ROUTER_PROVIDERS = [
  provideRouter(topRoutes),
  provideWebpack(asyncRoutes),
  providePrefetchIdleCallbacks(prefetchRouteCallbacks),
  AUTH_PROVIDERS,
  CanDeactivateGuard
];
