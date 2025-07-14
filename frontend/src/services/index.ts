import { apiService } from './api';
import { approvalService } from './approvalService';
import { attendanceService } from './attendanceService';
import { authService } from './authService';
// import { employeeService } from './EmployeeService';

//service 파일들 진입점
//api 서비스들을 모아서 export
export * from './api';
export * from './authService';
export * from './approvalService';
export * from './EmployeeService';
export * from './attendanceService';

// 모든 서비스를 하나의 객체로 export
export const services = {
  api: apiService,
  auth: authService,
  approval: approvalService,
  // employee: employeeService,
  attendance: attendanceService,
};

export default services;