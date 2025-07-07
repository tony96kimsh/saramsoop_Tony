// components/attendance/AnnualInfo.tsx

import { Typography, Box, Paper } from '@mui/material';
import { dummyPersonalLeave } from './AttendDummy';

interface AnnualInfoProps {
  userId: number;
}

function AnnualInfo({ userId }: AnnualInfoProps) {
  const leave = dummyPersonalLeave.find((l) => l.user_id === userId);

  const infoItems = [
    { label: '잔여 연차', value: leave?.remain_leave_days ?? '조회실패' },
    { label: '사용 연차', value: leave?.used_leave_days ?? '조회실패' },
    { label: '전체 연차', value: leave?.total_leave_days ?? '조회실패' },
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
