import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchEmployees } from '../../services/EmployeeService';
import axios from 'axios';

export interface Employee {
  id: number;

  name: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  position: string;
  email: string;
  department: string;
  status: 'Active' | 'Inactive';
  birth: string;
  phone: string;
  address: string;
  postal: string;
  career: string;
  join: string;
  leave?: string;
  bank: string;
  account: string;
  holder: string;
}

export type CreateEmployee = Omit<Employee, 'id'>;
export type UpdateEmployee = Employee;

interface EmployeeContextType {
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  loading: boolean;
  error: string | null;
  refreshEmployees: () => Promise<void>;
}

const EmployeeContext = createContext<EmployeeContextType>({
  employees: [],
  setEmployees: () => {},
  loading: false,
  error: null,
  refreshEmployees: async () => {},
});

export const EmployeeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmployees();
      // role 대문자 변환 (만약 API에서 안 하면 여기에 해도 됨)
      const fixedData = data.map((e: Employee) => ({
        ...e,
        role: e.role.toUpperCase() as 'ADMIN' | 'MANAGER' | 'EMPLOYEE',
      }));
      setEmployees(fixedData);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message || 'Error fetching employees');
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error fetching employees');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, loading, error, refreshEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployees = () => useContext(EmployeeContext);
