// components/attendance/AttendanceDetail.tsx
import React, { useEffect, useState } from 'react';
import {
  Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip, Pagination, Box,
} from '@mui/material';
import axios from 'axios';

interface AttendanceDetailProps {
  userId: string;
}

interface AttendanceRecord {
  attendance_date: string;
  clock_in_time: string | null;
  clock_out_time: string | null;
  attendance_status: string;
}

function AttendanceDetail({ userId }: AttendanceDetailProps) {
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(`http://localhost:5277/api/attendance/${userId}`);
        setRecords(res.data);
      } catch (e) {
        console.error('근태 정보 조회 실패:', e);
        setError(true);
      }
    };

    fetchAttendance();
  }, [userId]);

  const attendanceData = records.map((record) => {
    const inTime = record.clock_in_time
      ? new Date(record.clock_in_time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      : '-';

    const outTime = record.clock_out_time
      ? new Date(record.clock_out_time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      : '-';

    const total = (record.clock_in_time && record.clock_out_time)
      ? calcWorkHours(record.clock_in_time, record.clock_out_time)
      : '-';

    const statusMap: { [key: string]: string } = {
      PRESENT: '출근',
      LATE: '지각',
      ABSENT: '결석',
      LEAVE: '연차',
    };

    return {
      date: record.attendance_date,
      in: inTime,
      out: outTime,
      total,
      status: statusMap[record.attendance_status] ?? '기타',
    };
  });

  const paginatedData = attendanceData.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const totalPages = Math.ceil(attendanceData.length / rowsPerPage);

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        근태 현황
      </Typography>

      {error ? (
        <Typography color="error" sx={{ mt: 2 }}>근태 정보를 불러올 수 없습니다.</Typography>
      ) : (
        <>
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
                  const rowColor =
                    row.status === '지각' ? '#fff8e1'
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
                            borderColor: 'currentColor',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="center" mt={3}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handleChange}
              color="standard"
            />
          </Box>
        </>
      )}
    </>
  );
}

export default AttendanceDetail;

// 총 근무 시간 계산 함수
function calcWorkHours(start: string, end: string): string {
  const startTime = new Date(start);
  const endTime = new Date(end);
  const diffMs = endTime.getTime() - startTime.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}시간${minutes > 0 ? ` ${minutes}분` : ''}`;
}
