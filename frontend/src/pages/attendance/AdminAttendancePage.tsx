// pages/TeamAttendancePage.tsx

import React from 'react';
import { Box } from '@mui/material';
import AdminAttendanceTable from '../../components/attendance/AdminAttendanceTable';

function AdminAttendancePage() {
  return (
    <Box>
      <AdminAttendanceTable />
    </Box>
  );
}

export default AdminAttendancePage;
