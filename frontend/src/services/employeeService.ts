import { apiService, type ApiResponse, type PaginationRequest, type PaginationResponse } from './api';

export interface EmployeeDto {
  id: number;
  empNo: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  role: 'admin' | 'manager' | 'employee';
  hireDate: string;
  salary?: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  profileImage?: string;
}

export interface EmployeeListRequest extends PaginationRequest {
  department?: string;
  position?: string;
  role?: string;
  isActive?: boolean;
  searchKeyword?: string;
}

export interface CreateEmployeeRequest {
  empNo: string;
  name: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  role: 'admin' | 'manager' | 'employee';
  hireDate: string;
  salary?: number;
  password: string;
}

export interface UpdateEmployeeRequest extends Partial<Omit<CreateEmployeeRequest, 'password'>> {
  id: number;
  newPassword?: string;
}

class EmployeeService {
  async getEmployees(params: EmployeeListRequest): Promise<PaginationResponse<EmployeeDto>> {
    return apiService.get<PaginationResponse<EmployeeDto>>('/employees', params);
  }

  async getEmployeeById(id: number): Promise<EmployeeDto> {
    return apiService.get<EmployeeDto>(`/employees/${id}`);
  }

  async getMyProfile(): Promise<EmployeeDto> {
    return apiService.get<EmployeeDto>('/employees/my-profile');
  }

  async createEmployee(request: CreateEmployeeRequest): Promise<EmployeeDto> {
    return apiService.post<EmployeeDto>('/employees', request);
  }

  async updateEmployee(request: UpdateEmployeeRequest): Promise<EmployeeDto> {
    const { id, ...data } = request;
    return apiService.put<EmployeeDto>(`/employees/${id}`, data);
  }

  async updateMyProfile(data: Partial<UpdateEmployeeRequest>): Promise<EmployeeDto> {
    return apiService.put<EmployeeDto>('/employees/my-profile', data);
  }

  async deleteEmployee(id: number): Promise<ApiResponse> {
    return apiService.delete<ApiResponse>(`/employees/${id}`);
  }

  async deleteMultipleEmployees(ids: number[]): Promise<ApiResponse> {
    return apiService.post<ApiResponse>('/employees/delete-multiple', { ids });
  }

  async activateEmployee(id: number): Promise<ApiResponse> {
    return apiService.patch<ApiResponse>(`/employees/${id}/activate`);
  }

  async deactivateEmployee(id: number): Promise<ApiResponse> {
    return apiService.patch<ApiResponse>(`/employees/${id}/deactivate`);
  }

  // 부서 목록 조회
  async getDepartments(): Promise<string[]> {
    return apiService.get<string[]>('/employees/departments');
  }

  // 직급 목록 조회
  async getPositions(): Promise<string[]> {
    return apiService.get<string[]>('/employees/positions');
  }

  // 직원 검색 (자동완성용)
  async searchEmployees(keyword: string): Promise<EmployeeDto[]> {
    return apiService.get<EmployeeDto[]>('/employees/search', { keyword });
  }
}

export const employeeService = new EmployeeService();