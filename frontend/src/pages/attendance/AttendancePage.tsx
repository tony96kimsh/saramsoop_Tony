// pages/AttendancePage.tsx

import React from 'react';
import { Typography, Box } from '@mui/material';
import AttendanceTabs from '../../components/attendance/AttendanceTabs';
<<<<<<< HEAD
import MyAnnualInfo from '../../components/attendance/EmployeeAnnualInfo';
import EmployeeAttendanceList from '../../components/attendance/EmployeeAttendanceList';
import PeriodAttendanceList from '../../components/attendance/PeriodAttendanceList';

function AttendancePage() {
=======
import AnnualInfo from '../../components/attendance/AnnualInfo';
import AttendanceDetail from '../../components/attendance/AttendanceDetail';
import AttendanceList from '../../components/attendance/AttendanceList';

type UserRole = 'Employee' | 'Admin' | 'Manager' | 'Dev';

function AttendancePage() {
  const nowUser = 1;
  // const userRole: UserRole = 'Dev';
  const userRole = 'Dev' as UserRole; // 개발/디버깅용

  // 역할별 탭 구성
  const tabs = [
    { label: '내 근태', key: 'my', show: true },
    { label: '근태 관리', key: 'admin', show: userRole === 'Admin' || userRole === 'Dev' },
    { label: '팀 근태 관리', key: 'manager', show: userRole === 'Manager' || userRole === 'Dev' },
  ].filter((tab) => tab.show);

  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box
      sx={{
        width: '100vw',
<<<<<<< HEAD
=======
        maxWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200, px: 2 }}>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 4 }}
        >
          근태관리
        </Typography>

        <AttendanceTabs
          tabIndex={tabIndex}
          onChange={handleTabChange}
          tabs={tabs.map((tab) => tab.label)}
        />

        <Box sx={{ mt: 3 }}>
          {tabs[tabIndex]?.key === 'my' && (
            <>
              <AnnualInfo userId={nowUser} />
              <AttendanceDetail userId={nowUser} />
            </>
          )}

          {tabs[tabIndex]?.key === 'admin' && (
            <AttendanceList />
          )}

          {tabs[tabIndex]?.key === 'manager' && (
            <AttendanceList />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AttendancePage;
