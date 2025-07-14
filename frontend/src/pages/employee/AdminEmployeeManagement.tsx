import EmployeeTabs from '../../components/employee/EmployeeTabs';
import { useEmployees } from '../../components/employee/EmployeeProvider';

export default function AdminEmployeePage() {
  const { employees, setEmployees } = useEmployees();
  const userId = 1; // 관리자 ID

  return (
    <EmployeeTabs
      userId={userId}
      role="ADMIN"
      employees={employees}
      setEmployees={setEmployees}
      showAddButton
      showDeleteButton
      showCheckbox
      showActions
    />
  );
}
