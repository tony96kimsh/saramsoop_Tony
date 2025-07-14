import { type RouteObject } from 'react-router-dom';
import Approvals from '../pages/approval/ApprovalList';
import ApprovalAdmin from '../pages/approval/ApprovalAdmin';
import ApprovalDetail from '../pages/approval/ApprovalDetail';
import ApprovalRequest from '../pages/approval/ApprovalRequest';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Layout from '../components/layout/Layout';

const AppRouter: RouteObject[] = [
  {
    path: '/approvals',
    element: (
      <ProtectedRoute requiredRoles={['Employee','Admin','Manager']}>
        <Layout>
          <Approvals />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/approvalAdmin',
    element: (
      <ProtectedRoute requiredRoles={['Employee','Admin','Manager']}>
        <Layout>
          <ApprovalAdmin />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/approval/:id',
    element: (
      <ProtectedRoute requiredRoles={['Employee','Admin','Manager']}>
        <Layout>
          <ApprovalDetail />
        </Layout>
      </ProtectedRoute>
    ),
  },
  { //결재 요청
    path: '/approval/request',
    element: (
      <ProtectedRoute requiredRoles={['Employee','Admin','Manager']}>
        <Layout>
          <ApprovalRequest />
        </Layout>
      </ProtectedRoute>
    ),
  },
];


export default AppRouter;