import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Alert,
} from '@mui/material';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ko } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
// import { mockUser } from '../data/mockData';

const ApprovalRequest: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    approval_type: '',
    approval_name: '',
    start_date: null as Date | null,
    end_date: null as Date | null,
    reason: '',
    emergency_contact: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 유효성 검사
    const newErrors: Record<string, string> = {};
    
    if (!formData.approval_type) {
      newErrors.approval_type = '결재 유형을 선택해주세요.';
    }
    if (!formData.approval_name) {
      newErrors.approval_name = '결재명을 입력해주세요.';
    }
    if (!formData.start_date) {
      newErrors.start_date = '시작일을 선택해주세요.';
    }
    if (!formData.end_date) {
      newErrors.end_date = '종료일을 선택해주세요.';
    }
    if (!formData.reason) {
      newErrors.reason = '사유를 입력해주세요.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 실제로는 API 호출
    console.log('결재 신청:', formData);
    alert('결재 신청이 완료되었습니다.');
    navigate('/approvals');
  };

  const handleInputChange = (field: string, value: string | Date | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ko}>
      <Box>
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          결재 신청
        </Typography>

        <Paper sx={{ p: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth error={!!errors.approval_type}>
                  <InputLabel>결재 유형</InputLabel>
                  <Select
                    value={formData.approval_type}
                    label="결재 유형"
                    onChange={(e) => handleInputChange('approval_type', e.target.value)}
                  >
                    <MenuItem value="연차신청">연차신청</MenuItem>
                    <MenuItem value="휴가신청">휴가신청</MenuItem>
                  </Select>
                  {errors.approval_type && (
                    <Typography variant="caption" color="error">
                      {errors.approval_type}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="결재명"
                  value={formData.approval_name}
                  onChange={(e) => handleInputChange('approval_name', e.target.value)}
                  error={!!errors.approval_name}
                  helperText={errors.approval_name}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="시작일"
                  value={formData.start_date}
                  onChange={(date) => handleInputChange('start_date', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.start_date,
                      helperText: errors.start_date,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="종료일"
                  value={formData.end_date}
                  onChange={(date) => handleInputChange('end_date', date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!errors.end_date,
                      helperText: errors.end_date,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="사유"
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  error={!!errors.reason}
                  helperText={errors.reason}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="비상연락처 (선택사항)"
                  value={formData.emergency_contact}
                  onChange={(e) => handleInputChange('emergency_contact', e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Alert severity="info">
                  결재 신청 후에는 수정이나 취소가 불가능합니다. 신중히 검토 후 신청해주세요.
                </Alert>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/approvals')}
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    신청
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </LocalizationProvider>
  );
};

export default ApprovalRequest;