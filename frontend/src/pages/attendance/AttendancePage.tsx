import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import AttendanceTabs from '../../components/attendance/AttendanceTabs';
import AnnualInfo from '../../components/attendance/AnnualInfo';
import AttendanceDetail from '../../components/attendance/AttendanceDetail';
import AttendanceList from '../../components/attendance/AttendanceList';
import axios from 'axios';

type UserRole = 'Employee' | 'Admin' | 'Manager' | 'Dev';

function AttendancePage() {
  const nowUser = 'EMP001'; // ✅ 추후 로그인 정보로 대체 예정

  const [userId, setUserId] = useState<number | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('Dev'); // 개발용 디폴트
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5277/api/users/${nowUser}`);
        setUserId(res.data.id);
        setUserRole(res.data.role);
      } catch (err) {
        console.error('사용자 정보 조회 실패', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [nowUser]);

  const tabs = [
    { label: '내 근태', key: 'my', show: true },
    { label: '근태 관리', key: 'admin', show: userRole === 'Admin' || userRole === 'Dev' },
    { label: '팀 근태 관리', key: 'manager', show: userRole === 'Manager' || userRole === 'Dev' },
  ].filter((tab) => tab.show);

  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1200, px: 2 }}>
        <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 4 }}>
          근태관리
        </Typography>

        <AttendanceTabs
          tabIndex={tabIndex}
          onChange={handleTabChange}
          tabs={tabs.map((tab) => tab.label)}
        />

        <Box sx={{ mt: 3 }}>
          {userId !== null && tabs[tabIndex]?.key === 'my' && (
            <>
              <AnnualInfo userId={userId} />
              <AttendanceDetail userId={userId} />
            </>
          )}

          {(tabs[tabIndex]?.key === 'admin' || tabs[tabIndex]?.key === 'manager') && (
            <AttendanceList />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default AttendancePage;
