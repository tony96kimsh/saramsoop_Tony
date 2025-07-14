import React, { useState, useEffect } from 'react';
import ApprovalTable from '../../components/ApprovalTable';
import { Box, Button, Paper, Stack, Toolbar, Typography, CircularProgress, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
  approvalService, 
  type ApprovalListRequest, 
  type ApprovalDto, 
} from '../../services/approvalService';

import type { PaginationResponse } from '../../services/api';
import type { GridRowId } from '@mui/x-data-grid';

//관리자,팀장용 결재 리스트
//결재 : 사원,팀장은 admin, admin은 다른 admin에게 결재 가능
export default function ApprovalAdmin() {
  const navigate = useNavigate();
  
  // 상태 관리
  const [data, setData] = useState<PaginationResponse<ApprovalDto> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<GridRowId[]>([]); // 선택된 항목들

  // 페이지네이션 및 필터 상태
  const [params, setParams] = useState<ApprovalListRequest>({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  // 데이터 가져오기 함수
  const fetchApprovals = async (requestParams: ApprovalListRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching approvals with params:', requestParams);
      const result = await approvalService.getApprovals(requestParams);
      setData(result);
      console.log('Approvals fetched successfully:', result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '데이터를 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('Failed to fetch approvals:', err);
    } finally {
      setLoading(false);
    }
  };

  // 초기 데이터 로드 및 params 변경시 데이터 재로드
  useEffect(() => {
    fetchApprovals(params);
  }, [params]);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  // 정렬 변경 핸들러
  const handleSortChange = (sortBy: string, sortOrder: 'asc' | 'desc') => {
    setParams(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
  };

  // 필터 변경 핸들러
  const handleFilterChange = (filters: Partial<ApprovalListRequest>) => {
    setParams(prev => ({ ...prev, ...filters, page: 1 }));
  };

  // 선택된 항목 삭제
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 항목을 선택해주세요.');
      return;
    }

    if (!window.confirm(`선택한 ${selectedIds.length}개 항목을 삭제하시겠습니까?`)) {
      return;
    }

    try {
      setLoading(true);
      // const idsAsNumbers = selectedIds.map(id => Number(id)).filter(id => !isNaN(id));
      // await approvalService.deleteMultipleApprovals(idsAsNumbers);
      
      // // 성공 후 데이터 새로고침 및 선택 초기화
      // await fetchApprovals(params);
      // setSelectedIds([]);
      alert('삭제가 완료되었습니다.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '삭제 중 오류가 발생했습니다.';
      alert(errorMessage);
      console.error('Delete failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // 새로고침 핸들러
  const handleRefresh = () => {
    fetchApprovals(params);
  };

  // 선택 변경 핸들러 - GridRowId[] 타입 처리
  const handleSelectionChange = (ids: GridRowId[]) => {
    setSelectedIds(ids);
  };

  // 결재 승인/거부 핸들러 (테이블에서 호출할 수 있도록)
  const handleApprovalAction = async (id: number, action: 'approve' | 'reject', comment?: string) => {
    try {
      setLoading(true);
      if (action === 'approve') {
        await approvalService.approveApproval({ id, action, comment });
      } else {
        await approvalService.rejectApproval({ id, action, comment });
      }
      
      // 성공 후 데이터 새로고침
      await fetchApprovals(params);
      alert(`결재가 ${action === 'approve' ? '승인' : '거부'}되었습니다.`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.';
      alert(errorMessage);
      console.error('Approval action failed:', err);
    } finally {
      setLoading(false);
    }
  };

  // 에러만 있고 데이터가 없는 경우 (초기 로딩 실패)
  if (error && !data) {
    return (
      <Box sx={{ maxWidth: 'xl', mx: 'auto', my: 4, mt: 10, px: 2 }}>
        <Alert 
          severity="error" 
          action={
            <Button color="inherit" size="small" onClick={handleRefresh}>
              다시 시도
            </Button>
          }
        >
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 'xl', mx: 'auto', my: 4, mt: 10, px: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">결재 관리</Typography>
        <Stack direction="row" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate('/approval/request')}
            sx={{
              backgroundColor: '#fff',
              '&:hover': {
                backgroundColor: '#1976D2',
                color: '#fff',
                borderColor: '#2E6C4D'
              }
            }}
          >
            결재 생성
            {/* 관리자는 결재 생성이 필요할까? */}
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ backgroundColor: '#fff' }}
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0 || loading}
          >
            선택 삭제 ({selectedIds.length})
          </Button>
        </Stack>
      </Toolbar>

      <Paper sx={{ p: 3 }}>
        {/* 로딩 중이거나 에러가 있는 경우 상태 표시 */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            <Typography variant="body2">
              {data ? '데이터를 업데이트하는 중...' : '데이터를 불러오는 중...'}
            </Typography>
          </Box>
        )}

        {error && data && (
          <Alert severity="warning" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 데이터가 없는 경우 */}
        {!loading && !data && !error && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="textSecondary">
              표시할 데이터가 없습니다.
            </Typography>
            <Button onClick={handleRefresh} sx={{ mt: 2 }}>
              새로고침
            </Button>
          </Box>
        )}

        {/* 테이블 */}
        {data && (
          <ApprovalTable
            rows={data.items}
            totalCount={data.totalCount}
            page={data.page}
            pageSize={data.pageSize}
            totalPages={data.totalPages}
            hasNextPage={data.hasNextPage}
            hasPreviousPage={data.hasPreviousPage}
            selectedIds={selectedIds}
            onSelectionChange={handleSelectionChange}
            onDetail={(id) => navigate(`/approval/${id}`, { state: { canEdit: true } })}
            onPageChange={handlePageChange}
            onSortChange={handleSortChange}
            onFilterChange={handleFilterChange}
            onApprovalAction={handleApprovalAction}
            onRefresh={handleRefresh}
            dataType="approval"
            showActions={true}
            showCheckbox={true}
            loading={loading}
          />
        )}
      </Paper>
    </Box>
  );
}