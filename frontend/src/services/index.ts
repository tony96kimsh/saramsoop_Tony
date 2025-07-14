import { apiService } from './api';
import { approvalService } from './approvalService';
import { attendanceService } from './attendanceService';
import { authService } from './authService';
import { employeeService } from './employeeService';

export * from './api';
export * from './authService';
export * from './approvalService';
export * from './employeeService';
export * from './attendanceService';

// 모든 서비스를 하나의 객체로 export
export const services = {
  api: apiService,
  auth: authService,
  approval: approvalService,
  employee: employeeService,
  attendance: attendanceService,
};

export default services;