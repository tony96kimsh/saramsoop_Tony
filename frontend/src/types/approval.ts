export interface Approval {
  id: number;
  requester_id: number;
  approver_id: number;
  approval_status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approval_name: string;
  approval_type: string;
  pending_time: string;
  approved_time?: string;
  rejected_time?: string;
  created_at: string;
  updated_at: string;
  requester_name: string;
  approver_name: string;
  rejection_reason?: string;
  details?: {
    start_date: string;
    end_date: string;
    reason: string;
    emergency_contact?: string;
    days_count?: number;
  };
}

export interface User {
  id: number;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  emp_no: string;
  email: string;
  department_id: number;
  department_name: string;
  position_id: number;
  position_name: string;
  phone_no: string;
  hire_date: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Position {
  id: number;
  name: string;
}