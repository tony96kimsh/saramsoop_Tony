import { createContext, useContext, useState } from 'react';
import { employees as seed } from '../../mock/Employees';
import type { EmployeeDetail } from '../../mock/Employees';

interface EmployeeCtx {
  employees: EmployeeDetail[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeDetail[]>>;
}

const EmployeeContext = createContext<EmployeeCtx | undefined>(undefined);

export function EmployeeProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<EmployeeDetail[]>(seed);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
}

export function useEmployees(): EmployeeCtx {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used inside EmployeeProvider');
  return ctx;
}
