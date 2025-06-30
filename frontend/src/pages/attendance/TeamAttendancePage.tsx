// pages/TeamAttendancePage.tsx

import React from 'react';
import { Box } from '@mui/material';
import TeamAttendanceTable from '../../components/attendance/TeamAttendanceTable';

function TeamAttendancePage() {
  return (
    <Box>
      <TeamAttendanceTable />
    </Box>
  );
}

export default TeamAttendancePage;
