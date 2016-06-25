import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { AuthComponent } from './auth.component';

export const authRoutes = [
  { path: 'login', component: AuthComponent, data: {title: 'Login'} }
];

export const AUTH_PROVIDERS = [AuthGuard, AuthService];
