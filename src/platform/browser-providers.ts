/*
 * These are globally available services in any component or any other service
 */

// Angular 2
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
// Angular 2 Http
import { HTTP_PROVIDERS } from '@angular/http';
// Angular 2 Router
import { provideRouter } from '@angular/router';
// Angular 2 forms
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import { MATERIAL_PROVIDERS } from './angular-material2';

import { Title } from '@angular/platform-browser';

import { APP_ROUTER_PROVIDERS } from '../app/app.routes';

/*
* Application Providers/Directives/Pipes
* providers/directives/pipes that only live in our browser environment
*/
export const APPLICATION_PROVIDERS = [
  // new Angular 2 forms
  disableDeprecatedForms(),
  provideForms(),

  ...APP_ROUTER_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...MATERIAL_PROVIDERS,

  { provide: LocationStrategy, useClass: PathLocationStrategy },
  { provide: Title, useClass: Title }
];

export const PROVIDERS = [
  ...APPLICATION_PROVIDERS
];
