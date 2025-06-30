// pages/AttendancePage.tsx
import React from 'react';
import { Typography, Container } from '@mui/material';
import AttendanceTabs from '../../components/attendance/AttendanceTabs';

function AttendancePage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}> {/* 좌우 여백 + 상하 패딩 추가 */}
      <Typography
        variant="h4"
        component="h2"
        fontWeight="bold"
        sx={{ mb: 4 }} // 제목 아래 여백 크게
      >
        근태관리  
      </Typography>

      <AttendanceTabs />
    </Container>
  );
}

export default AttendancePage;
