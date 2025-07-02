import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Pagination,
  Box,
} from '@mui/material';

const attendanceData = [
  { date: '2024-07-22', in: '09:00 AM', out: '06:05 PM', total: '9시간', status: '출근' },
  { date: '2024-07-23', in: '09:20 AM', out: '06:00 PM', total: '8시간 40분', status: '지각' },
  { date: '2024-07-24', in: '-', out: '-', total: '-', status: '결석' },
  { date: '2024-07-25', in: '09:00 AM', out: '06:00 PM', total: '9시간', status: '출근' },
  { date: '2024-07-26', in: '09:05 AM', out: '05:55 PM', total: '8시간 50분', status: '출근' },
  { date: '2024-07-27', in: '-', out: '-', total: '-', status: '연차' },
  { date: '2024-07-28', in: '09:00 AM', out: '06:00 PM', total: '9시간', status: '출근' },
  { date: '2024-07-29', in: '09:35 AM', out: '06:00 PM', total: '8시간 25분', status: '지각' },
];

function EmployeeAttendanceList() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedData = attendanceData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  const totalPages = Math.ceil(attendanceData.length / rowsPerPage);

  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        근태 현황
      </Typography>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>날짜</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>출근 시간</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>퇴근 시간</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>총 근무 시간</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>상태</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, idx) => {
              const rowColor = row.status === '지각' ? '#fff8e1'
                : row.status === '결석' ? '#ffebee'
                : row.status === '연차' ? '#e3f2fd'
                : 'inherit';

              return (
                <TableRow key={idx} sx={{ backgroundColor: rowColor }}>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.in}</TableCell>
                  <TableCell>{row.out}</TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>
                  <Chip
                    label={row.status}
                    color={
                      row.status === '출근' ? 'success' :
                      row.status === '지각' ? 'warning' :
                      row.status === '결석' ? 'error' :
                      row.status === '연차' ? 'info' :
                      'default'
                    }
                    variant="outlined"
                    sx={{
                      
                      borderWidth: 1.5,
                      borderColor: 'currentColor'
                    }}
                  />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

        </Table>
      </TableContainer>

      {/* 페이지 네비게이션 */}
      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="standard"
        />
      </Box>
    </>
  );
}

export default EmployeeAttendanceList;