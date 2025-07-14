import { apiService, type ApiResponse, type PaginationRequest } from './api';

export interface ApprovalDto {
  id: number;
  requesterId: number;
  approverId: number;
  approvalStatus: 'pending' | 'approved' | 'rejected'; // 'approve' -> 'approved'로 수정
  approvalName: string;
  approvalType: string;
  pendingTime?: string;
  approvedTime?: string;
  rejectedTime?: string;
  createdAt: string;
  updatedAt: string;
  requesterName: string;
  requesterEmpNo: string;
  approverName: string;
  approverEmpNo: string;
  description?: string;
  amount?: number;
  attachments?: string[];
}

export interface ApprovalListRequest extends PaginationRequest {
  status?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}

export interface CreateApprovalRequest {
  approvalName: string;
  approvalType: string;
  approverId: number;
  description?: string;
  amount?: number;
  attachments?: File[];
}

export interface UpdateApprovalRequest extends Partial<CreateApprovalRequest> {
  id: number;
}

export interface ApprovalActionRequest {
  id: number;
  action: 'approve' | 'reject';
  comment?: string;
}

export interface PaginationResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class ApprovalService {
  async getApprovals(params: ApprovalListRequest): Promise<PaginationResponse<ApprovalDto>> {
    return apiService.get<PaginationResponse<ApprovalDto>>('/approvals', params as unknown as Record<string, unknown>);
  }

  async getApprovalById(id: number): Promise<ApprovalDto> {
    return apiService.get<ApprovalDto>(`/approvals/${id}`);
  }

  async createApproval(request: CreateApprovalRequest): Promise<ApprovalDto> {
    return apiService.post<ApprovalDto>('/approvals', request);
  }

  async updateApproval(request: UpdateApprovalRequest): Promise<ApprovalDto> {
    const { id, ...data } = request;
    return apiService.put<ApprovalDto>(`/approvals/${id}`, data);
  }

  async deleteApproval(id: number): Promise<ApiResponse> {
    return apiService.delete<ApiResponse>(`/approvals/${id}`);
  }

  async deleteMultipleApprovals(ids: number[]): Promise<ApiResponse> {
    return apiService.post<ApiResponse>('/approvals/delete-multiple', { ids });
  }

  async approveApproval(request: ApprovalActionRequest): Promise<ApiResponse> {
    const { id, ...data } = request;
    return apiService.post<ApiResponse>(`/approvals/${id}/approve`, data);
  }

  async rejectApproval(request: ApprovalActionRequest): Promise<ApiResponse> {
    const { id, ...data } = request;
    return apiService.post<ApiResponse>(`/approvals/${id}/reject`, data);
  }

  // 내가 승인해야 할 결재 목록
  async getMyPendingApprovals(params: PaginationRequest): Promise<PaginationResponse<ApprovalDto>> {
    return apiService.get<PaginationResponse<ApprovalDto>>('/approvals/my-pending', params as unknown as Record<string, unknown>);
  }

  // 내가 요청한 결재 목록
  async getMyRequestedApprovals(params: PaginationRequest): Promise<PaginationResponse<ApprovalDto>> {
    return apiService.get<PaginationResponse<ApprovalDto>>('/approvals/my-requests', params as unknown as Record<string, unknown>);
  }

  // 결재 통계
  async getApprovalStats(): Promise<{
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    myPending: number;
  }> {
    return apiService.get('/approvals/stats');
  }
}

export const approvalService = new ApprovalService();