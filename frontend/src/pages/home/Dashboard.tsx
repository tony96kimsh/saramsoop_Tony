import type { RouteObject } from 'react-router-dom';
import DashboardRouter from '../../pages/auth/DashboardRouter';
import Layout from '../../components/layout/Layout';
// import ProtectedRoute from '../components/auth/ProtectedRoute';

const Dashboard: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      // <ProtectedRoute>
        <Layout>
          <DashboardRouter />
        </Layout>
      // </ProtectedRoute>
    ),
  }
];


export default Dashboard;
