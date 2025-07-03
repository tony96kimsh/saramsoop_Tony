// pages/AttendancePage.tsx
import React from 'react';
import { Typography, Box } from '@mui/material';
import AttendanceTabs from '../../components/attendance/AttendanceTabs';
import AnnualInfo from '../../components/attendance/AnnualInfo';
import AttendanceDetail from '../../components/attendance/AttendanceDetail';
import AttendanceList from '../../components/attendance/AttendanceList';

function AttendancePage() {

  const nowUser = 1;
  return (
    // 전체 너비를 차지하는 래퍼
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100%',
        minHeight: '100vh', // 필요 시 전체 높이 확보
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        boxSizing: 'border-box', // 패딩 포함 너비 계산
      }}
    >
      {/* 실제 콘텐츠 영역 - 가운데 정렬됨 */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,  // 원하는 최대 콘텐츠 너비
          px: 2,           // 좌우 패딩
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          근태관리
        </Typography>

        <AttendanceTabs />
        
        {/* 근태 상세 */}
        <Box sx={{ mt: 3 }}>
          {/* 현재 로그인된 userId를 전달 */}
          <AnnualInfo userId={nowUser}/>
          <AttendanceDetail userId={nowUser} />
        </Box>

        {/* 근태관리, 팀 근태관리 */}
        <Box sx={{ mt: 3 }}>
          <AttendanceList />
        </Box>

      </Box>
    </Box>
  );
}

export default AttendancePage;