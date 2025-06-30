import { useState } from 'react';
import { EmployeeContext } from './EmployeeContext';
import { employees as seed } from '../mock/Employees';
import type { EmployeeDetail } from '../mock/Employees';

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<EmployeeDetail[]>(seed);
  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}
