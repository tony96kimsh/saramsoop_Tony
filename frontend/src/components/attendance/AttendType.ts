/* ---------- Types ---------- */

export type AttendanceStatus = 'PRESENT' | 'LATE' | 'ABSENT' | 'LEAVE';

export interface User {
  id: number;
  emp_no: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone_no: string;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface Attendance {
  id: number;
  user_id: number;
  attendance_date: string;
  clock_in_time: string | null;
  clock_out_time: string | null;
  attendance_status: AttendanceStatus;
  description?: string;
}

export interface PersonalLeave {
  id: number;
  user_id: number;
  year: number;
  total_leave_days: number;
  used_leave_days: number;
  remain_leave_days: number;
}