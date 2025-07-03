import MyEmployeePage from './MyEmployeeManagement';
import AdminEmployeePage from './AdminEmployeeManagement';
import ManagerPage from './TeamEmployeeManagement';
import { useEmployees } from '../../components/employee/EmployeeProvider';

export default function EmployeePageRouter() {
  const { employees } = useEmployees();
  const currentUserId = 1; // TODO: 로그인된 사용자 ID 가져오기
  // 현재 1 = 팀장, 11 = 관리자, 그 외 14까지는 사원
  const me = employees.find(e => e.id === currentUserId);

  if (!me) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  if (!['Admin', 'Manager', 'Employee'].includes(me.role)) {
  return <div>접근 권한이 없습니다.</div>;
  }

  switch (me.role) {
    case 'Admin':
      return <AdminEmployeePage />;
    case 'Manager':
      return <ManagerPage />;
    case 'Employee':
    default:
      return <MyEmployeePage />;
  }
}
