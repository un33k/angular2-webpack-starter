import { RouterConfig } from '@angular/router';
import { HomeComponent } from './home';
import { UnfoundComponent } from './unfound';

export const routes: RouterConfig = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  // make sure you match the component type string to the require in asyncRoutes
  { path: 'about', component: 'AboutComponent' },
  { path: '**',    component: UnfoundComponent },
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
