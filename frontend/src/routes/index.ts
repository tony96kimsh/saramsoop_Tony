import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import AttendanceRoutes from './AttendanceRoutes';
import ApprovalRoutes from './ApprovalRoutes';
import Dashboard from '../pages/home/Dashboard'

const AppRoutes = [
  ...LoginRoutes,
  ...HomeRoutes,
  ...EmployeeRoutes,
  ...AttendanceRoutes,
  ...ApprovalRoutes,
  ...Dashboard
];

export default AppRoutes;