import type { RouteObject } from "react-router-dom";
// import ProtectedRoute from "../components/auth/ProtectedRoute";
import Layout from "../components/layout/Layout";
import AttendancePage from "../pages/attendance/AttendancePage";
import AttendanceDetailPage from "../pages/attendance/AttendanceDetailPage";

const AttendanceRoutes: RouteObject[] = [
  {
    path: '/attend',
    element: (
      // <ProtectedRoute>
        <Layout>
          <AttendancePage />
        </Layout>
      // </ProtectedRoute>
    ),
  },
  {
    path: '/attend/:id',
    element: (
      // <ProtectedRoute>
        <Layout>
          <AttendanceDetailPage />
        </Layout>
      // </ProtectedRoute>
    ),
  },
];

export default AttendanceRoutes;