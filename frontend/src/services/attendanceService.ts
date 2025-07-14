import { apiService, type ApiResponse, type PaginationRequest, type PaginationResponse } from './api';

export interface AttendanceDto {
  id: number;
  employeeId: number;
  employeeName: string;
  employeeEmpNo: string;
  workDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  workHours?: number;
  overtimeHours?: number;
  status: 'present' | 'absent' | 'late' | 'early_leave' | 'half_day';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AttendanceListRequest extends PaginationRequest {
  employeeId?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  department?: string;
}

export interface CreateAttendanceRequest {
  employeeId: number;
  workDate: string;
  checkInTime?: string;
  checkOutTime?: string;
  status: AttendanceDto['status'];
  notes?: string;
}

export interface UpdateAttendanceRequest extends Partial<CreateAttendanceRequest> {
  id: number;
}

export interface CheckInOutRequest {
  type: 'check_in' | 'check_out';
  notes?: string;
}

export interface AttendanceStatsDto {
  totalWorkDays: number;
  presentDays: number;
  absentDays: number;
  lateDays: number;
  totalWorkHours: number;
  totalOvertimeHours: number;
  attendanceRate: number;
}

class AttendanceService {
  async getAttendances(params: AttendanceListRequest): Promise<PaginationResponse<AttendanceDto>> {
    return apiService.get<PaginationResponse<AttendanceDto>>('/attendances', params as unknown as Record<string, unknown>);
  }

  async getAttendanceById(id: number): Promise<AttendanceDto> {
    return apiService.get<AttendanceDto>(`/attendances/${id}`);
  }

  async getMyAttendances(params: PaginationRequest): Promise<PaginationResponse<AttendanceDto>> {
    return apiService.get<PaginationResponse<AttendanceDto>>('/attendances/my-attendances', params as unknown as Record<string, unknown>);
  }

  async getTodayAttendance(): Promise<AttendanceDto | null> {
    return apiService.get<AttendanceDto | null>('/attendances/today');
  }

  async createAttendance(request: CreateAttendanceRequest): Promise<AttendanceDto> {
    return apiService.post<AttendanceDto>('/attendances', request);
  }

  async updateAttendance(request: UpdateAttendanceRequest): Promise<AttendanceDto> {
    const { id, ...data } = request;
    return apiService.put<AttendanceDto>(`/attendances/${id}`, data);
  }

  async deleteAttendance(id: number): Promise<ApiResponse> {
    return apiService.delete<ApiResponse>(`/attendances/${id}`);
  }

  async deleteMultipleAttendances(ids: number[]): Promise<ApiResponse> {
    return apiService.post<ApiResponse>('/attendances/delete-multiple', { ids });
  }

  // 출퇴근 체크
  async checkInOut(request: CheckInOutRequest): Promise<AttendanceDto> {
    return apiService.post<AttendanceDto>('/attendances/check-in-out', request);
  }

  // 근태 통계 조회
  async getAttendanceStats(params: {
    employeeId?: number;
    startDate?: string;
    endDate?: string;
  }): Promise<AttendanceStatsDto> {
    return apiService.get<AttendanceStatsDto>('/attendances/stats', params);
  }

  // 월별 근태 현황
  async getMonthlyAttendance(params: {
    employeeId?: number;
    year: number;
    month: number;
  }): Promise<AttendanceDto[]> {
    return apiService.get<AttendanceDto[]>('/attendances/monthly', params);
  }

  // 부서별 근태 현황
  async getDepartmentAttendanceStats(params: {
    department?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    department: string;
    totalEmployees: number;
    attendanceRate: number;
    avgWorkHours: number;
  }[]> {
    return apiService.get('/attendances/department-stats', params);
  }
}

export const attendanceService = new AttendanceService();