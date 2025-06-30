// Hooks
import { useContext } from 'react';
import { EmployeeContext, type EmployeeCtx } from './EmployeeContext';

export function useEmployees(): EmployeeCtx {
  const ctx = useContext(EmployeeContext);
  if (!ctx) throw new Error('useEmployees must be used inside EmployeeProvider');
  return ctx;
}