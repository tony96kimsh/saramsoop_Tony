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
  checkIn: string;
  checkOut: string;
  workTime: string;
  status: Status;
}

const rows: Attendance[] = [
  { id: 1, name: '이선우', department: '엔지니어링', checkIn: '09:05', checkOut: '18:00', workTime: '8시간 55분', status: 'Active' },
  { id: 5, name: '정재현', department: '엔지니어링', checkIn: '09:15', checkOut: '17:50', workTime: '8시간 35분', status: 'Active' },
  { id: 11, name: '이도윤', department: '엔지니어링', checkIn: '09:10', checkOut: '18:10', workTime: '9시간 0분', status: 'Active' },
  { id: 12, name: '김하늘', department: '엔지니어링', checkIn: '-', checkOut: '-', workTime: '-', status: 'Inactive' },
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

export default function TeamAttendanceTable() {
  const [pageSize, setPageSize] = useState(10);
  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
