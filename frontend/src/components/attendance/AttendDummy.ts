// components/attendance/AttendDummy.ts

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

/* ---------- User 더미 ---------- */

export const dummyUsers: User[] = [
  {
    id: 1,
    emp_no: 'EMP001',
    name: '이선우',
    department: '엔지니어링',
    position: '사원',
    email: 'sunwoo@hrapp.com',
    phone_no: '010-1234-5678',
    status: 'ACTIVE',
  },
  {
    id: 2,
    emp_no: 'EMP002',
    name: '김민지',
    department: '마케팅',
    position: '대리',
    email: 'minji@hrapp.com',
    phone_no: '010-2345-6789',
    status: 'ACTIVE',
  },
  {
    id: 3,
    emp_no: 'EMP003',
    name: '박지훈',
    department: '영업',
    position: '과장',
    email: 'jihun@hrapp.com',
    phone_no: '010-3456-7890',
    status: 'INACTIVE',
  },
];

/* ---------- Attendance 더미 ---------- */

export const dummyAttendance: Attendance[] = [
  // 이선우
  {
    id: 1,
    user_id: 1,
    attendance_date: '2025-07-01',
    clock_in_time: '2025-07-01T09:05:00',
    clock_out_time: '2025-07-01T18:00:00',
    attendance_status: 'PRESENT',
  },
  {
    id: 2,
    user_id: 1,
    attendance_date: '2025-07-02',
    clock_in_time: null,
    clock_out_time: null,
    attendance_status: 'LEAVE',
    description: '연차 사용',
  },

  // 김민지
  {
    id: 3,
    user_id: 2,
    attendance_date: '2025-07-01',
    clock_in_time: '2025-07-01T09:10:00',
    clock_out_time: '2025-07-01T18:10:00',
    attendance_status: 'LATE',
  },
  {
    id: 4,
    user_id: 2,
    attendance_date: '2025-07-02',
    clock_in_time: '2025-07-02T09:00:00',
    clock_out_time: '2025-07-02T18:00:00',
    attendance_status: 'PRESENT',
  },

  // 박지훈
  {
    id: 5,
    user_id: 3,
    attendance_date: '2025-07-01',
    clock_in_time: null,
    clock_out_time: null,
    attendance_status: 'ABSENT',
    description: '미출근',
  },
  {
    id: 6,
    user_id: 3,
    attendance_date: '2025-07-02',
    clock_in_time: null,
    clock_out_time: null,
    attendance_status: 'LEAVE',
    description: '연차',
  },
];

/* ---------- PersonalLeave 더미 ---------- */

export const dummyPersonalLeave: PersonalLeave[] = [
  {
    id: 1,
    user_id: 1,
    year: 2025,
    total_leave_days: 15,
    used_leave_days: 3,
    remain_leave_days: 12,
  },
  {
    id: 2,
    user_id: 2,
    year: 2025,
    total_leave_days: 15,
    used_leave_days: 5,
    remain_leave_days: 10,
  },
  {
    id: 3,
    user_id: 3,
    year: 2025,
    total_leave_days: 12,
    used_leave_days: 4,
    remain_leave_days: 8,
  },
];
