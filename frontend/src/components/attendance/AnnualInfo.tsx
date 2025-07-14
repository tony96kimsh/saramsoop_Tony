// components/attendance/AnnualInfo.tsx

import { Typography, Box, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AnnualInfoProps {
  userId: string; // ✅ EMP001
}

interface LeaveInfo {
  remain_leave_days: number;
  used_leave_days: number;
  total_leave_days: number;
}

function AnnualInfo({ userId }: AnnualInfoProps) {
  const [leave, setLeave] = useState<LeaveInfo | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLeaveInfo = async () => {
      try {
        const res = await axios.get(`http://localhost:5277/api/personalleave/${userId}`);
        setLeave(res.data);
      } catch (e) {
        console.error('연차 정보 조회 실패:', e);
        setError(true);
      }
    };

    fetchLeaveInfo();
  }, [userId]);

  const infoItems = [
    { label: '잔여 연차', value: leave?.remain_leave_days ?? (error ? '조회실패' : '로딩 중') },
    { label: '사용 연차', value: leave?.used_leave_days ?? (error ? '조회실패' : '로딩 중') },
    { label: '전체 연차', value: leave?.total_leave_days ?? (error ? '조회실패' : '로딩 중') },
  ];

  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        연차 정보
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {infoItems.map((item, idx) => (
          <Paper
            key={idx}
            variant="outlined"
            sx={{
              flex: 1,
              p: 2,
              textAlign: 'center',
              backgroundColor: '#fcfcfc',
              borderRadius: 2,
            }}
          >
            <Typography>{item.label}</Typography>
            <Typography variant="h6" fontWeight="bold">
              {item.value}
            </Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
}

export default AnnualInfo;
