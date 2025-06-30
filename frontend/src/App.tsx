// App.tsx

import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import AttendancePage from './pages/attendance/AttendancePage';

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ mt: 10 }}>
        <AttendancePage />
      </Container>
    </>
  );
}

export default App;