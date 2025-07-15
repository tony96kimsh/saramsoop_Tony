// services/approvalService.ts - 백엔드 API 구조에 맞춤
import { apiService, type ApiResponse, type PaginationRequest } from './api';

export interface ApprovalDto {
  id: number;
  requesterId: number;
  approverId: number;
  approvalStatus: 'pending' | 'approved' | 'rejected';
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
  // 🔥 백엔드 Swagger에 맞춘 엔드포인트 사용
  async getApprovals(params: ApprovalListRequest): Promise<PaginationResponse<ApprovalDto>> {
    try {
      console.log('📡 getApprovals 호출:', params);
      
      // 🔥 Swagger에서 확인된 올바른 엔드포인트: /api/Approval (대문자 A)
      const result = await apiService.get<PaginationResponse<ApprovalDto>>('/Approval', params as unknown as Record<string, unknown>);
      console.log('✅ approvals 데이터 조회 성공:', result);
      return result;
      
    } catch (error) {
      console.error('❌ getApprovals 실패:', error);
      
      // 🔥 실패시 빈 데이터 반환 (에러 방지)
      const emptyResult: PaginationResponse<ApprovalDto> = {
        items: [],
        totalCount: 0,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
      
      console.log('📝 빈 데이터 반환:', emptyResult);
      return emptyResult;
    }
  }

  async getApprovalById(id: number): Promise<ApprovalDto> {
    try {
      console.log(`📡 getApprovalById(${id}) 호출`);
      return await apiService.get<ApprovalDto>(`/Approval/${id}`);
    } catch (error) {
      console.error(`❌ getApprovalById(${id}) 실패:`, error);
      throw error;
    }
  }

  async createApproval(request: CreateApprovalRequest): Promise<ApprovalDto> {
    try {
      console.log('📡 createApproval 호출:', request);
      return await apiService.post<ApprovalDto>('/Approval', request);
    } catch (error) {
      console.error('❌ createApproval 실패:', error);
      throw error;
    }
  }

  async updateApproval(request: UpdateApprovalRequest): Promise<ApprovalDto> {
    try {
      console.log(`📡 updateApproval(${request.id}) 호출:`, request);
      const { id, ...data } = request;
      return await apiService.put<ApprovalDto>(`/Approval/${id}`, data);
    } catch (error) {
      console.error(`❌ updateApproval(${request.id}) 실패:`, error);
      throw error;
    }
  }

  async deleteApproval(id: number): Promise<ApiResponse> {
    try {
      console.log(`📡 deleteApproval(${id}) 호출`);
      return await apiService.delete<ApiResponse>(`/Approval/${id}`);
    } catch (error) {
      console.error(`❌ deleteApproval(${id}) 실패:`, error);
      throw error;
    }
  }

  // 🔥 Swagger에서 확인된 실제 엔드포인트들
  async processApproval(id: number, action: 'approve' | 'reject', comment?: string): Promise<ApiResponse> {
    try {
      console.log(`📡 processApproval(${id}, ${action}) 호출`);
      // Swagger의 POST /api/Approval/{id}/process 엔드포인트 사용
      return await apiService.post<ApiResponse>(`/Approval/${id}/process`, {
        action,
        comment
      });
    } catch (error) {
      console.error(`❌ processApproval(${id}, ${action}) 실패:`, error);
      throw error;
    }
  }

  // 승인 (processApproval을 사용)
  async approveApproval(request: ApprovalActionRequest): Promise<ApiResponse> {
    return this.processApproval(request.id, 'approve', request.comment);
  }

  // 거부 (processApproval을 사용)
  async rejectApproval(request: ApprovalActionRequest): Promise<ApiResponse> {
    return this.processApproval(request.id, 'reject', request.comment);
  }

  // 결재 통계 - Swagger의 /api/Approval/statistics 엔드포인트
  async getApprovalStats(): Promise<{
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    myPending: number;
  }> {
    try {
      console.log('📡 getApprovalStats 호출');
      return await apiService.get('/Approval/statistics');
    } catch (error) {
      console.error('❌ getApprovalStats 실패:', error);
      // 실패시 기본값 반환
      return {
        totalPending: 0,
        totalApproved: 0,
        totalRejected: 0,
        myPending: 0
      };
    }
  }

  // 내가 승인해야 할 결재 목록 - Swagger의 /api/Approval/pending-for-me
  async getMyPendingApprovals(params: PaginationRequest): Promise<PaginationResponse<ApprovalDto>> {
    try {
      console.log('📡 getMyPendingApprovals 호출:', params);
      return await apiService.get<PaginationResponse<ApprovalDto>>('/Approval/pending-for-me', params as unknown as Record<string, unknown>);
    } catch (error) {
      console.error('❌ getMyPendingApprovals 실패:', error);
      return {
        items: [],
        totalCount: 0,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
    }
  }

  // 내가 요청한 결재 목록 - Swagger의 /api/Approval/my-requests
  async getMyRequestedApprovals(params: PaginationRequest): Promise<PaginationResponse<ApprovalDto>> {
    try {
      console.log('📡 getMyRequestedApprovals 호출:', params);
      return await apiService.get<PaginationResponse<ApprovalDto>>('/Approval/my-requests', params as unknown as Record<string, unknown>);
    } catch (error) {
      console.error('❌ getMyRequestedApprovals 실패:', error);
      return {
        items: [],
        totalCount: 0,
        page: params.page || 1,
        pageSize: params.pageSize || 10,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
      };
    }
  }

}

export const approvalService = new ApprovalService();