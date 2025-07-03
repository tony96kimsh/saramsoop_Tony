import type { RouteObject } from 'react-router-dom';
import EmployeePageRouter from '../pages/employee/EmployeePageRouter';
import EmployeeCreatePage from '../pages/employee/EmployeeCreatePage';
import EmployeeDetailPage from '../pages/employee/EmployeeDetailPage';
import Layout from '../components/layout/Layout';
// import ProtectedRoute from '../components/auth/ProtectedRoute';

const EmployeeRoutes: RouteObject[] = [
  {
    path: '/employeepage',
    element: (
      // <ProtectedRoute>
        <Layout>
          <EmployeePageRouter />
        </Layout>
      // </ProtectedRoute>
    ),
  },
  {
    path: '/employee/create',
    element: (
      // <ProtectedRoute>
        <Layout>
          <EmployeeCreatePage />
        </Layout>
      // </ProtectedRoute>
    ),
  },
  {
    path: '/employee/:id',
    element: (
      // <ProtectedRoute>
        <Layout>
          <EmployeeDetailPage />
        </Layout>
      // </ProtectedRoute>
    ),
  },
];


export default EmployeeRoutes;
