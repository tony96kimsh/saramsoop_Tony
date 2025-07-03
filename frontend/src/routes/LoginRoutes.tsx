import type { RouteObject } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import UnauthorizedPage from '../pages/auth/UnauthorizedPage';

const LoginRoutes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/unauthorized',
    element: <UnauthorizedPage />,
  },
];

export default LoginRoutes;
