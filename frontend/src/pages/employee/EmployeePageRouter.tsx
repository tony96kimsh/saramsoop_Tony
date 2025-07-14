import MyEmployeePage from './MyEmployeeManagement';
import AdminEmployeePage from './AdminEmployeeManagement';
import ManagerPage from './TeamEmployeeManagement';
import { useEmployees } from '../../components/employee/EmployeeProvider';

export default function EmployeePageRouter() {
  const { employees, loading, error } = useEmployees();
  const currentUserId = 1; // TODO: 실제 로그인 사용자 ID로 교체

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러: {error}</div>;

  const me = employees.find(e => e.id === currentUserId);
  if (!me) return <div>사용자 정보를 불러올 수 없습니다.</div>;

  if (!['ADMIN', 'MANAGER', 'EMPLOYEE'].includes(me.role)) {
    return <div>접근 권한이 없습니다.</div>;
  }

  switch (me.role) {
    case 'ADMIN':
      return <AdminEmployeePage />;
    case 'MANAGER':
      return <ManagerPage />;
    case 'EMPLOYEE':
      return <MyEmployeePage />;
    default:
      return <div>알 수 없는 역할</div>;
  }
}
