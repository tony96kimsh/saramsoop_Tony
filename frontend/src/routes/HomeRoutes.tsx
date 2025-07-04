import type { RouteObject } from 'react-router-dom';
import AdminHome from '../pages/home/AdminHome';
import ManagerHome from '../pages/home/ManagerHome';
import EmployeeHome from '../pages/home/EmployeeHome';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';

const HomeRoutes: RouteObject[] = [
  {
    path: '/adminHome',
    element: (
      <ProtectedRoute requiredRoles={['Admin']}>
        <Layout>
          <AdminHome />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/managerHome',
    element: (
      <ProtectedRoute requiredRoles={['Manager']}>
        <Layout>
          <ManagerHome />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/employeeHome',
    element: (
      <ProtectedRoute requiredRoles={['Employee']}>
        <Layout>
          <EmployeeHome />
        </Layout>
      </ProtectedRoute>
    ),
  },
];

export default HomeRoutes;
