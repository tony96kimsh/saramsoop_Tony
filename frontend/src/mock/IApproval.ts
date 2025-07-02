// src/mock/employees.ts
export type Status = 'Active' | 'Inactive';

/** 리스트에서 쓰이는 기본 정보 */
export interface IUser {
  id: number;
  name: string;
  position: string;   // 직급
  email: string;
  department: string;
  status: Status;
  role: string; //권한
}

/** 상세 페이지에 필요한 추가 정보 */
export interface IApproval extends IUser {
  id: number;
  requester_id: number; // users.id 참조
  approver_id: number;  // users.id 참조
  approval_status: 'Pending' | 'Approved' | 'Rejected' | string; // 예시 상태값 '결재중', '승인', '반려' 등
  reason?: string; // 사유
  approval_name: string;  //요청자명
  approval_type?: string;  //승인자 명
  pending_time?: Date | null; // 선택적 필드 및 null 가능
  approved_time?: Date | null; // 선택적 필드 및 null 가능
  rejected_time?: Date | null; // 선택적 필드 및 null 가능
  created_at?: Date; // 선택적 필드
  updated_at?: Date; // 선택적 필드
}

/* --------------------- 더미 데이터 14명 --------------------- */
// mock/Users.ts
export const mockUsers: IUser[] = [
  {
    id: 1,
    name: '김철수',
    position: '대리',
    email: 'kim.cs@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Developer'
  },
  {
    id: 2,
    name: '이영희',
    position: '과장',
    email: 'lee.yh@company.com',
    department: '마케팅팀',
    status: 'Active',
    role: 'Manager'
  },
  {
    id: 3,
    name: '박민수',
    position: '차장',
    email: 'park.ms@company.com',
    department: '인사팀',
    status: 'Active',
    role: 'HR Manager'
  },
  {
    id: 4,
    name: '정수진',
    position: '사원',
    email: 'jung.sj@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Junior Developer'
  },
  {
    id: 5,
    name: '최동욱',
    position: '부장',
    email: 'choi.dw@company.com',
    department: '영업팀',
    status: 'Active',
    role: 'Sales Director'
  },
  {
    id: 6,
    name: '한미영',
    position: '대리',
    email: 'han.my@company.com',
    department: '디자인팀',
    status: 'Active',
    role: 'Designer'
  },
  {
    id: 7,
    name: '송재호',
    position: '과장',
    email: 'song.jh@company.com',
    department: '개발팀',
    status: 'Inactive',
    role: 'Tech Lead'
  },
  {
    id: 8,
    name: '임지현',
    position: '사원',
    email: 'lim.jh@company.com',
    department: '회계팀',
    status: 'Active',
    role: 'Accountant'
  },
  {
    id: 9,
    name: '강하늘',
    position: '대리',
    email: 'kang.hn@company.com',
    department: '기획팀',
    status: 'Active',
    role: 'Planner'
  },
  {
    id: 10,
    name: '윤서진',
    position: '사원',
    email: 'yoon.sj@company.com',
    department: '마케팅팀',
    status: 'Active',
    role: 'Marketing Assistant'
  },
  {
    id: 11,
    name: '오태민',
    position: '차장',
    email: 'oh.tm@company.com',
    department: '영업팀',
    status: 'Active',
    role: 'Sales Manager'
  },
  {
    id: 12,
    name: '배수현',
    position: '과장',
    email: 'bae.sh@company.com',
    department: '인사팀',
    status: 'Active',
    role: 'HR Specialist'
  },
  {
    id: 13,
    name: '남궁민',
    position: '사원',
    email: 'namgung.m@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Frontend Developer'
  },
  {
    id: 14,
    name: '서유나',
    position: '대리',
    email: 'seo.yn@company.com',
    department: '디자인팀',
    status: 'Active',
    role: 'UI/UX Designer'
  }
];

// mock/Approvals.ts
export const mockApprovals: IApproval[] = [
  {
    id: 1,
    name: '김철수',
    position: '대리',
    email: 'kim.cs@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Developer',
    requester_id: 1,
    approver_id: 3,
    approval_status: 'Pending',
    reason: '업무 도구 구매 요청',
    approval_name: '김철수',
    approval_type: '박민수',
    pending_time: new Date('2024-06-28T09:30:00'),
    approved_time: null,
    rejected_time: null,
    created_at: new Date('2024-06-28T09:30:00'),
    updated_at: new Date('2024-06-28T09:30:00')
  },
  {
    id: 2,
    name: '이영희',
    position: '과장',
    email: 'lee.yh@company.com',
    department: '마케팅팀',
    status: 'Active',
    role: 'Manager',
    requester_id: 2,
    approver_id: 5,
    approval_status: 'Approved',
    reason: '광고 예산 승인 요청',
    approval_name: '이영희',
    approval_type: '최동욱',
    pending_time: new Date('2024-06-25T14:20:00'),
    approved_time: new Date('2024-06-26T10:15:00'),
    rejected_time: null,
    created_at: new Date('2024-06-25T14:20:00'),
    updated_at: new Date('2024-06-26T10:15:00')
  },
  {
    id: 3,
    name: '정수진',
    position: '사원',
    email: 'jung.sj@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Junior Developer',
    requester_id: 4,
    approver_id: 7,
    approval_status: 'Rejected',
    reason: '교육비 지원 신청',
    approval_name: '정수진',
    approval_type: '송재호',
    pending_time: new Date('2024-06-20T11:00:00'),
    approved_time: null,
    rejected_time: new Date('2024-06-22T16:30:00'),
    created_at: new Date('2024-06-20T11:00:00'),
    updated_at: new Date('2024-06-22T16:30:00')
  },
  {
    id: 4,
    name: '한미영',
    position: '대리',
    email: 'han.my@company.com',
    department: '디자인팀',
    status: 'Active',
    role: 'Designer',
    requester_id: 6,
    approver_id: 3,
    approval_status: 'Approved',
    reason: '디자인 소프트웨어 라이선스 구매',
    approval_name: '한미영',
    approval_type: '박민수',
    pending_time: new Date('2024-06-27T08:45:00'),
    approved_time: new Date('2024-06-28T13:20:00'),
    rejected_time: null,
    created_at: new Date('2024-06-27T08:45:00'),
    updated_at: new Date('2024-06-28T13:20:00')
  },
  {
    id: 5,
    name: '임지현',
    position: '사원',
    email: 'lim.jh@company.com',
    department: '회계팀',
    status: 'Active',
    role: 'Accountant',
    requester_id: 8,
    approver_id: 12,
    approval_status: 'Pending',
    reason: '회계 시스템 업그레이드 요청',
    approval_name: '임지현',
    approval_type: '배수현',
    pending_time: new Date('2024-06-29T15:10:00'),
    approved_time: null,
    rejected_time: null,
    created_at: new Date('2024-06-29T15:10:00'),
    updated_at: new Date('2024-06-29T15:10:00')
  },
  {
    id: 6,
    name: '강하늘',
    position: '대리',
    email: 'kang.hn@company.com',
    department: '기획팀',
    status: 'Active',
    role: 'Planner',
    requester_id: 9,
    approver_id: 3,
    approval_status: 'Approved',
    reason: '프로젝트 예산 증액 요청',
    approval_name: '강하늘',
    approval_type: '박민수',
    pending_time: new Date('2024-06-24T10:30:00'),
    approved_time: new Date('2024-06-25T09:45:00'),
    rejected_time: null,
    created_at: new Date('2024-06-24T10:30:00'),
    updated_at: new Date('2024-06-25T09:45:00')
  },
  {
    id: 7,
    name: '윤서진',
    position: '사원',
    email: 'yoon.sj@company.com',
    department: '마케팅팀',
    status: 'Active',
    role: 'Marketing Assistant',
    requester_id: 10,
    approver_id: 2,
    approval_status: 'Pending',
    reason: '마케팅 캠페인 기획안 승인',
    approval_name: '윤서진',
    approval_type: '이영희',
    pending_time: new Date('2024-06-30T14:00:00'),
    approved_time: null,
    rejected_time: null,
    created_at: new Date('2024-06-30T14:00:00'),
    updated_at: new Date('2024-06-30T14:00:00')
  },
  {
    id: 8,
    name: '오태민',
    position: '차장',
    email: 'oh.tm@company.com',
    department: '영업팀',
    status: 'Active',
    role: 'Sales Manager',
    requester_id: 11,
    approver_id: 5,
    approval_status: 'Rejected',
    reason: '영업 출장비 신청',
    approval_name: '오태민',
    approval_type: '최동욱',
    pending_time: new Date('2024-06-26T16:20:00'),
    approved_time: null,
    rejected_time: new Date('2024-06-27T11:10:00'),
    created_at: new Date('2024-06-26T16:20:00'),
    updated_at: new Date('2024-06-27T11:10:00')
  },
  {
    id: 9,
    name: '남궁민',
    position: '사원',
    email: 'namgung.m@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Frontend Developer',
    requester_id: 13,
    approver_id: 7,
    approval_status: 'Approved',
    reason: '개발 환경 구축 요청',
    approval_name: '남궁민',
    approval_type: '송재호',
    pending_time: new Date('2024-06-23T13:15:00'),
    approved_time: new Date('2024-06-24T08:30:00'),
    rejected_time: null,
    created_at: new Date('2024-06-23T13:15:00'),
    updated_at: new Date('2024-06-24T08:30:00')
  },
  {
    id: 10,
    name: '서유나',
    position: '대리',
    email: 'seo.yn@company.com',
    department: '디자인팀',
    status: 'Inactive',
    role: 'UI/UX Designer',
    requester_id: 14,
    approver_id: 3,
    approval_status: 'Pending',
    reason: 'UI/UX 도구 구매 요청',
    approval_name: '서유나',
    approval_type: '박민수',
    pending_time: new Date('2024-06-29T10:45:00'),
    approved_time: null,
    rejected_time: null,
    created_at: new Date('2024-06-29T10:45:00'),
    updated_at: new Date('2024-06-29T10:45:00')
  },
  {
    id: 11,
    name: '김철수',
    position: '대리',
    email: 'kim.cs@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Developer',
    requester_id: 1,
    approver_id: 7,
    approval_status: 'Approved',
    reason: '서버 증설 요청',
    approval_name: '김철수',
    approval_type: '송재호',
    pending_time: new Date('2024-06-21T09:00:00'),
    approved_time: new Date('2024-06-22T14:20:00'),
    rejected_time: null,
    created_at: new Date('2024-06-21T09:00:00'),
    updated_at: new Date('2024-06-22T14:20:00')
  },
  {
    id: 12,
    name: '배수현',
    position: '과장',
    email: 'bae.sh@company.com',
    department: '인사팀',
    status: 'Active',
    role: 'HR Specialist',
    requester_id: 12,
    approver_id: 3,
    approval_status: 'Rejected',
    reason: '인사 관리 시스템 도입',
    approval_name: '배수현',
    approval_type: '박민수',
    pending_time: new Date('2024-06-28T11:30:00'),
    approved_time: null,
    rejected_time: new Date('2024-06-29T09:15:00'),
    created_at: new Date('2024-06-28T11:30:00'),
    updated_at: new Date('2024-06-29T09:15:00')
  },
  {
    id: 13,
    name: '이영희',
    position: '과장',
    email: 'lee.yh@company.com',
    department: '마케팅팀',
    status: 'Active',
    role: 'Manager',
    requester_id: 2,
    approver_id: 5,
    approval_status: 'Pending',
    reason: '마케팅 툴 구독 연장',
    approval_name: '이영희',
    approval_type: '최동욱',
    pending_time: new Date('2024-06-30T16:00:00'),
    approved_time: null,
    rejected_time: null,
    created_at: new Date('2024-06-30T16:00:00'),
    updated_at: new Date('2024-06-30T16:00:00')
  },
  {
    id: 14,
    name: '정수진',
    position: '사원',
    email: 'jung.sj@company.com',
    department: '개발팀',
    status: 'Active',
    role: 'Junior Developer',
    requester_id: 4,
    approver_id: 1,
    approval_status: 'Approved',
    reason: '개발 서적 구매 요청',
    approval_name: '정수진',
    approval_type: '김철수',
    pending_time: new Date('2024-06-25T12:00:00'),
    approved_time: new Date('2024-06-26T15:45:00'),
    rejected_time: null,
    created_at: new Date('2024-06-25T12:00:00'),
    updated_at: new Date('2024-06-26T15:45:00')
  }
];