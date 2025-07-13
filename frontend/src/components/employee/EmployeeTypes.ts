export type Role = 'ADMIN' | 'MANAGER' | 'EMPLOYEE'; 
export type Status = 'Active' | 'Inactive';

export interface Employee {
  id: number;
  name: string;
  role: Role;
  email: string;
  position: string;
  department: string;
  status: Status;
  birth: string;     // yyyy-MM-dd 형식
  phone: string;
  address: string;
  postal: string;
  career: string;    // ex) "5"
  join: string;      // 입사일: yyyy-MM-dd
  leave?: string;    // 퇴사일: yyyy-MM-dd 또는 "N/A"
  bank: string;
  account: string;
  holder: string;
}
