import axios from 'axios';
import type { Employee, CreateEmployee, UpdateEmployee } from '../components/employee/EmployeeProvider';

const API_BASE = '/api/employees';

export async function fetchEmployees(): Promise<Employee[]> {
  const response = await axios.get(API_BASE);
  return response.data;
}

export async function fetchEmployeeById(id: number): Promise<Employee> {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
}

export async function createEmployee(employee: CreateEmployee): Promise<Employee> {
  const response = await axios.post(API_BASE, employee);
  return response.data;
}

export async function updateEmployee(employee: UpdateEmployee): Promise<void> {
  await axios.put(`${API_BASE}/${employee.id}`, employee);
}

export async function deleteEmployee(id: number): Promise<void> {
  await axios.delete(`${API_BASE}/${id}`);
}
