import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Checkbox,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Typography,
//   TextField,
} from '@mui/material';
import { Download, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import  type { Approval } from '../types/approval';
import { mockUser } from '../data/mockData';

const ApprovalList: React.FC = () => {
  const navigate = useNavigate();
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [selected, setSelected] = useState<number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  // Mock data
  useEffect(() => {
    const mockApprovals: Approval[] = [
      {
        id: 1,
        requester_id: 2,
        approver_id: 1,
        approval_status: 'PENDING',
        approval_name: '연차신청',
        approval_type: '연차신청',
        pending_time: '2025-07-01T09:00:00',
        created_at: '2025-07-01T09:00:00',
        updated_at: '2025-07-01T09:00:00',
        requester_name: '이영희',
        approver_name: '김철수',
      },
      {
        id: 2,
        requester_id: 3,
        approver_id: 1,
        approval_status: 'APPROVED',
        approval_name: '마케팅',
        approval_type: '휴가신청',
        pending_time: '2025-06-30T14:00:00',
        approved_time: '2025-06-30T16:00:00',
        created_at: '2025-06-30T14:00:00',
        updated_at: '2025-06-30T16:00:00',
        requester_name: '박민수',
        approver_name: '김철수',
      },
      {
        id: 3,
        requester_id: 4,
        approver_id: 1,
        approval_status: 'REJECTED',
        approval_name: '영업',
        approval_type: '연차신청',
        pending_time: '2025-06-29T10:00:00',
        rejected_time: '2025-06-29T15:00:00',
        created_at: '2025-06-29T10:00:00',
        updated_at: '2025-06-29T15:00:00',
        requester_name: '최지은',
        approver_name: '김철수',
        rejection_reason: '업무 일정상 승인 불가',
      },
    ];

    // 권한별 데이터 필터링
    let filteredApprovals = mockApprovals;
    if (mockUser.role === 'EMPLOYEE') {
      filteredApprovals = mockApprovals.filter(approval => approval.requester_id === mockUser.id);
    } else if (mockUser.role === 'MANAGER') {
      filteredApprovals = mockApprovals.filter(approval => approval.approver_id === mockUser.id);
    }

    setApprovals(filteredApprovals);
  }, []);

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelected(filteredApprovals.map(approval => approval.id));
    } else {
      setSelected([]);
    }
  };

  const handleSelect = (id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const getStatusChip = (status: string) => {
    const statusMap = {
      PENDING: { label: '결재대기', color: 'warning' as const },
      APPROVED: { label: '승인', color: 'success' as const },
      REJECTED: { label: '반려', color: 'error' as const },
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Chip
        label={statusInfo.label}
        color={statusInfo.color}
        size="small"
      />
    );
  };

  const filteredApprovals = approvals.filter(approval => {
    const statusMatch = statusFilter === 'ALL' || approval.approval_status === statusFilter;
    const typeMatch = typeFilter === 'ALL' || approval.approval_type === typeFilter;
    return statusMatch && typeMatch;
  });

  const handleExcelDownload = () => {
    const selectedApprovals = approvals.filter(approval => selected.includes(approval.id));
    // Excel 다운로드 로직 (실제로는 라이브러리 사용)
    console.log('Excel 다운로드:', selectedApprovals);
    alert('Excel 다운로드 기능은 실제 구현에서 라이브러리를 사용해주세요.');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR');
  };

  return (
    <>
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          결재 관리
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {(mockUser.role === 'MANAGER' || mockUser.role === 'EMPLOYEE') && (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<Add />}
              onClick={() => navigate('/approvals/request')}
            >
              결재 신청
            </Button>
          )}
          <Button
            variant="outlined"
            startIcon={<Download />}
            onClick={handleExcelDownload}
            disabled={selected.length === 0}
          >
            선택 삭제
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>상태</InputLabel>
          <Select
            value={statusFilter}
            label="상태"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="PENDING">결재대기</MenuItem>
            <MenuItem value="APPROVED">승인</MenuItem>
            <MenuItem value="REJECTED">반려</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>유형</InputLabel>
          <Select
            value={typeFilter}
            label="유형"
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <MenuItem value="ALL">전체</MenuItem>
            <MenuItem value="연차신청">연차신청</MenuItem>
            <MenuItem value="휴가신청">휴가신청</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    indeterminate={selected.length > 0 && selected.length < filteredApprovals.length}
                    checked={filteredApprovals.length > 0 && selected.length === filteredApprovals.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>요청자</TableCell>
                <TableCell>사유</TableCell>
                <TableCell>부서</TableCell>
                <TableCell>승인자</TableCell>
                <TableCell>요청일</TableCell>
                <TableCell>결재상태</TableCell>
                <TableCell>작업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApprovals
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((approval) => (
                  <TableRow
                    key={approval.id}
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/approvals/${approval.id}`)}
                  >
                    <TableCell padding="checkbox" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selected.indexOf(approval.id) !== -1}
                        onChange={() => handleSelect(approval.id)}
                      />
                    </TableCell>
                    <TableCell>{approval.requester_name}</TableCell>
                    <TableCell>{approval.approval_name}</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>{approval.approver_name}</TableCell>
                    <TableCell>{formatDate(approval.created_at)}</TableCell>
                    <TableCell>{getStatusChip(approval.approval_status)}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        onClick={() => navigate(`/approvals/${approval.id}`)}
                      >
                        상세 보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={filteredApprovals.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="페이지당 행 수:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} / 총 ${count}개`}
        />
      </Paper>
    </Box>
    </>
  );
};

export default ApprovalList;