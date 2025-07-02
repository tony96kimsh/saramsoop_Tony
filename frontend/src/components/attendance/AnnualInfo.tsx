// components/attendance/AnnualInfo.tsx

import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { dummyPersonalLeave } from './attendDummy';


interface AnnualInfoProps {
  userId: number;
}

function AnnualInfo({ userId }: AnnualInfoProps) {
  const leave = dummyPersonalLeave.find((item) => item.user_id === userId);

  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        연차 정보
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          mb: 4,
        }}
      >
        {[
          { label: '잔여 연차', value: 12 },
          { label: '사용 연차', value: 3 },
          { label: '전체 연차', value: 15 },
        ].map((item, idx) => (
          <Paper
            key={idx}
            variant="outlined"
            sx={{
              flex: 1,
              p: 2,
              textAlign: 'center',
              backgroundColor: '#f5f5f5', // 옅은 회색 배경
              borderRadius: 2,
            }}
          >
            <Typography>{item.label}</Typography>
            <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
}

export default AnnualInfo;