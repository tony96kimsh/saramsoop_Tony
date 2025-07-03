import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import AdminHome from './pages/home/AdminHome';
import ManagerHome from './pages/home/ManagerHome';
import EmployeeHome from './pages/home/EmployeeHome';
import UnauthorizedPage from './pages/auth/UnauthorizedPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AttendancePage from './pages/attendance/AttendancePage';
import AttendanceDetailPage from './pages/attendance/AttendanceDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        {/* 관리자 전용 */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRoles={['Admin']}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* 팀장 전용 */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute requiredRoles={['Manager']}>
              <ManagerHome />
            </ProtectedRoute>
          }
        />

        {/* 직원 전용 */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute requiredRoles={['Employee']}>
              <EmployeeHome />
            </ProtectedRoute>
          }
        />

        {/* 권한 없음 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
                
        <Route path="/attend" element={<AttendancePage />} />
        <Route path="/attend/:id" element={<AttendanceDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;