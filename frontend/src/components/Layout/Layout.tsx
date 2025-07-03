import React from 'react';
import Header from './Header';
import { Box, Toolbar } from '@mui/material';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Toolbar />

      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default Layout;
