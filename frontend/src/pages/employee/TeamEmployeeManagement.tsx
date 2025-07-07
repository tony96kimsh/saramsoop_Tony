import EmployeeTabs from '../../components/employee/EmployeeTabs';
import { useEmployees } from '../../components/employee/EmployeeProvider';

export default function TeamEmployeePage() {
  const { employees, setEmployees } = useEmployees();
  const userId = 1; // 팀장 ID

  return (
    <EmployeeTabs
      userId={userId}
      role="Manager"
      employees={employees}
      setEmployees={setEmployees}
      showCheckbox={false}
      showActions
    />
  );
}
