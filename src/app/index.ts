// App
export * from './app.component';
export * from './app.service';

import { AppState } from './app.service';

// Application wide providers
export const APP_PROVIDERS = [
  AppState
];

export const APP_MAIN_DOMAIN = 'http://localhost:8000';
export const APP_API_VERSION = 1;
