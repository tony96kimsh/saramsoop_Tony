import LoginRoutes from './LoginRoutes';
import HomeRoutes from './HomeRoutes';
import EmployeeRoutes from './EmployeeRoutes';
import AttendanceRoutes from './AttendanceRoutes';
import ApprovalRoutes from './ApprovalRoutes';

const AppRoutes = [
  ...LoginRoutes,
  ...HomeRoutes,
  ...EmployeeRoutes,
  ...AttendanceRoutes,
  ...ApprovalRoutes,
];

export default AppRoutes;