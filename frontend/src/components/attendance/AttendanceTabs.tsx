// components/attendance/AttendanceTabs.tsx

import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';

interface AttendanceTabsProps {
  tabIndex: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  tabs: string[];
}

function AttendanceTabs({ tabIndex, onChange, tabs }: AttendanceTabsProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={tabIndex}
        onChange={onChange}
        variant="standard"
        sx={{
          mb: 4,
          '.MuiTabs-flexContainer': {
            justifyContent: 'flex-start',
          },
        }}
      >
        {tabs.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>
    </Box>
  );
}

export default AttendanceTabs;