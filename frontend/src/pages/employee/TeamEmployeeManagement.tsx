import EmployeeTabs from '../../components/employee/EmployeeTabs';
import { useEmployees } from '../../components/employee/EmployeeProvider';

export default function TeamEmployeePage() {
  const { employees, setEmployees } = useEmployees();
  const userId = 3; // 팀장 ID

  return (
    <EmployeeTabs
      userId={userId}
      role="MANAGER"
      employees={employees}
      setEmployees={setEmployees}
      showCheckbox={false}
      showActions
    />
  );
}
