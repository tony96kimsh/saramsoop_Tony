import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  Divider,
} from '@mui/material';
import { Grid } from '@mui/material';
import { PictureAsPdf, Check, Close } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import type { Approval } from '../../types/approval';
import { mockUsers ,mockApprovals } from '../../mock/IApproval';

const ApprovalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [approval, setApproval] = useState<Approval | null>(null);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    // Mock data - 실제로는 API 호출
    const mockApproval: Approval = {
      id: parseInt(id || '1'),
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
      details: {
        start_date: '2025-07-15',
        end_date: '2025-07-17',
        reason: '개인 사정으로 인한 연차 신청',
        emergency_contact: '010-1234-5678',
      },
    };

    setApproval(mockApproval);
  }, [id]);

  const handleApprove = () => {
    if (!approval) return;
    
    // 실제로는 API 호출
    console.log('승인 처리:', approval.id);
    alert('결재가 승인되었습니다.');
    navigate('/approvals');
  };

  const handleReject = () => {
    if (!approval || !rejectReason.trim()) return;
    
    // 실제로는 API 호출
    console.log('반려 처리:', approval.id, rejectReason);
    alert('결재가 반려되었습니다.');
    setRejectDialog(false);
    navigate('/approvals');
  };

  const handlePdfDownload = () => {
    // PDF 생성 로직 (실제로는 라이브러리 사용)
    console.log('PDF 다운로드:', approval);
    alert('PDF 다운로드 기능은 실제 구현에서 라이브러리를 사용해주세요.');
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
        size="medium"
      />
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ko-KR');
  };

  // const canApproveOrReject = () => {
  //   return (
  //     approval?.approval_status === 'PENDING' &&
  //     (mockUser.role === 'ADMIN' || mockUser.role === 'MANAGER') &&
  //     approval.approver_id === mockUser.id
  //   );
  // };

  if (!approval) {
    return <Typography>로딩 중...</Typography>;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          결재 상세
        </Typography>
        <Button
          variant="outlined"
          startIcon={<PictureAsPdf />}
          onClick={handlePdfDownload}
        >
          PDF 다운로드
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} component="div">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5">
                {approval.approval_name}
              </Typography>
              {getStatusChip(approval.approval_status)}
            </Box>
            <Divider sx={{ mb: 3 }} />
          </Grid>

          <Grid item xs={12} md={6} component="div">
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              신청자
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {approval.requester_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} component="div">
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              승인자
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {approval.approver_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} component="div">
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              결재 유형
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {approval.approval_type}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} component="div">
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              신청일시
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {formatDate(approval.created_at)}
            </Typography>
          </Grid>

          {approval.details && (
            <>
              <Grid item xs={12} md={6} component="div">
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  시작일
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {approval.details.start_date}
                </Typography>
              </Grid>

              <Grid item xs={12} md={6} component="div">
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  종료일
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {approval.details.end_date}
                </Typography>
              </Grid>

              <Grid item xs={12} component="div">
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  사유
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {approval.details.reason}
                </Typography>
              </Grid>

              {approval.details.emergency_contact && (
                <Grid item xs={12} component="div">
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    비상연락처
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {approval.details.emergency_contact}
                  </Typography>
                </Grid>
              )}
            </>
          )}

          {approval.approved_time && (
            <Grid item xs={12} component="div">
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                승인일시
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {formatDate(approval.approved_time)}
              </Typography>
            </Grid>
          )}

          {approval.rejected_time && (
            <Grid item xs={12} component="div">
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                반려일시
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {formatDate(approval.rejected_time)}
              </Typography>
            </Grid>
          )}

          {approval.rejection_reason && (
            <Grid item xs={12} component="div">
              <Alert severity="error">
                <Typography variant="subtitle2" gutterBottom>
                  반려 사유
                </Typography>
                <Typography variant="body2">
                  {approval.rejection_reason}
                </Typography>
              </Alert>
            </Grid>
          )}

            <Grid item xs={12} component="table" >
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Close />}
                  onClick={() => setRejectDialog(true)}
                >
                  반려
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<Check />}
                  onClick={handleApprove}
                >
                  승인
                </Button>
              </Box>
            </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate('/approvals')}
              >
                목록으로 돌아가기
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* 반려 사유 입력 다이얼로그 */}
      <Dialog
        open={rejectDialog}
        onClose={() => setRejectDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>반려 사유 입력</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={4}
            fullWidth
            label="반려 사유"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            placeholder="반려 사유를 입력해주세요."
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectDialog(false)}>
            취소
          </Button>
          <Button
            onClick={handleReject}
            variant="contained"
            color="error"
            disabled={!rejectReason.trim()}
          >
            반려
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApprovalDetail;