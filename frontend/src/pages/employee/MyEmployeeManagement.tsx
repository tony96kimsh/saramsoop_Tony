import EmployeeTabs from '../../components/employee/EmployeeTabs';
import { useEmployees } from '../../components/employee/EmployeeProvider';

export default function MyEmployeePage() {
  const { employees, setEmployees } = useEmployees();
  const userId = 6; // 직원 ID

  return (
    <EmployeeTabs
      userId={userId}
      role="EMPLOYEE"
      employees={employees}
      setEmployees={setEmployees}
      showCheckbox={false}
      showActions={false}
    />
  );
}
