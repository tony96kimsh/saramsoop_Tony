import { useState } from 'react';
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridLogicOperator,
} from '@mui/x-data-grid';
import { Paper, Chip } from '@mui/material';
import { Link } from '@mui/material';

/* ---------- 타입 & 더미 데이터 ---------- */
type Status = 'Active' | 'Inactive';

interface Attendance {
  id: number;
  name: string;
  department: string;
  position: string; 
  checkIn: string;
  checkOut: string;
  workTime: string;
  status: Status;
}

const rows: Attendance[] = [
  { id: 1, name: '이선우', department: '엔지니어링', position: '사원', checkIn: '09:05', checkOut: '18:00', workTime: '8시간 55분', status: 'Active' },
  { id: 2, name: '김민지', department: '마케팅', position: '대리', checkIn: '09:00', checkOut: '18:10', workTime: '9시간 10분', status: 'Active' },
  { id: 3, name: '박지훈', department: '영업', position: '과장', checkIn: '-', checkOut: '-', workTime: '-', status: 'Inactive' },
  { id: 4, name: '최수아', department: '제품', position: '대리', checkIn: '08:55', checkOut: '18:05', workTime: '9시간 10분', status: 'Active' },
  { id: 5, name: '정재현', department: '엔지니어링', position: '차장', checkIn: '09:15', checkOut: '17:50', workTime: '8시간 35분', status: 'Active' },
  { id: 6, name: '서지우', department: '디자인', position: '사원', checkIn: '09:00', checkOut: '18:00', workTime: '9시간 0분', status: 'Active' },
  { id: 7, name: '한도윤', department: '품질관리', position: '과장', checkIn: '09:10', checkOut: '18:20', workTime: '9시간 10분', status: 'Active' },
  { id: 8, name: '오하늘', department: '고객지원', position: '사원', checkIn: '09:30', checkOut: '18:10', workTime: '8시간 40분', status: 'Active' },
  { id: 9, name: '장윤서', department: '회계', position: '대리', checkIn: '08:50', checkOut: '18:00', workTime: '9시간 10분', status: 'Active' },
  { id: 10, name: '이준호', department: '기획', position: '부장', checkIn: '결근', checkOut: '결근', workTime: '0시간', status: 'Inactive' },
];


const columns: GridColDef<Attendance>[] = [
  {
    field: 'name',
    headerName: '이름',
    flex: 1,
    minWidth: 130,
    renderCell: ({ row }: GridRenderCellParams<Attendance>) => (
      <Link
        href={`/attendance/${row.id}`}
        underline="hover"
        color="primary"
        sx={{ cursor: 'pointer' }}
      >
        {row.name}
      </Link>
    ),
  },
  { field: 'department', headerName: '부서', flex: 1, minWidth: 130 },
  { field: 'position', headerName: '직급', flex: 1, minWidth: 130 },
  { field: 'checkIn', headerName: '출근시간', flex: 1, minWidth: 120 },
  { field: 'checkOut', headerName: '퇴근시간', flex: 1, minWidth: 120 },
  { field: 'workTime', headerName: '근무시간', flex: 1, minWidth: 120 },
  {
    field: 'status',
    headerName: '상태',
    width: 120,
    renderCell: ({ value }: GridRenderCellParams<Attendance, Status>) => (
      <Chip
        label={value === 'Active' ? '근무 중' : '휴직'}
        color={value === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

export default function AdminAttendanceTable() {
  const [pageSize, setPageSize] = useState(10);
  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        paginationModel={{ pageSize, page: 0 }}
        onPaginationModelChange={(model) => setPageSize(model.pageSize)}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          filter: {
            filterModel: {
              items: [],
              quickFilterLogicOperator: GridLogicOperator.Or,
            },
          },
        }}
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              quickFilterParser: (input: string) =>
                input
                  .split(',')
                  .map((v) => v.trim())
                  .filter((v) => v !== ''),
            },
          },
        }}
        sx={{
          border: 0,
          '.MuiDataGrid-columnHeaders': { backgroundColor: '#f9fafb' },
          '.MuiDataGrid-row:hover': { backgroundColor: '#f3f4f6' },
        }}
      />
    </Paper>
  );
}
