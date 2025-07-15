import type { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import UnauthorizedPage from '../pages/auth/UnauthorizedPage';
import ResetPasswordRequest from '../pages/auth/ResetPasswordRequest';
import ResetPasswordConfirm from '../pages/auth/ResetPasswordConfirm';

const LoginRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
  {
    path: '/reset-password',
    element: <ResetPasswordRequest  />,
  },
  {
    path: '/reset-password/confirm',
    element: <ResetPasswordConfirm />,
  },
];

export default LoginRoutes;
