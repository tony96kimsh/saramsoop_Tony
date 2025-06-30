import { createContext } from 'react';
import type { EmployeeDetail } from '../mock/Employees';


export interface EmployeeCtx {
  employees: EmployeeDetail[];
  setEmployees: React.Dispatch<React.SetStateAction<EmployeeDetail[]>>;
}
export const EmployeeContext = 
  createContext<EmployeeCtx | undefined>(undefined);
