import MyEmployeePage from '../pages/employee/MyEmployeeManagement';
import AdminEmployeePage from '../pages/employee/AdminEmployeeManagement';
import TeamLeaderPage from '../pages/employee/TeamEmployeeManagement';
import { useEmployees } from '../components/EmployeeProvider';

export default function EmployeePageRouter() {
  const { employees } = useEmployees();
  const currentUserId = 6; // TODO: 로그인된 사용자 ID 가져오기
  const me = employees.find(e => e.id === currentUserId);

  if (!me) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  if (!['Admin', 'Manager', 'User'].includes(me.role)) {
  return <div>접근 권한이 없습니다.</div>;
  }

  switch (me.role) {
    case 'Admin':
      return <AdminEmployeePage />;
    case 'Manager':
      return <TeamLeaderPage />;
    case 'Employee':
    default:
      return <MyEmployeePage />;
  }
}
