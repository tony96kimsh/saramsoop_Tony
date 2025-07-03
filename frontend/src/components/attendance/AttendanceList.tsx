// Components > attendance > AttendanceList.tsx
// 기간별 근태 기록 목록 (이름, 부서, 직급, 출퇴근시간, 근무시간, 상태)

import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';

import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridLogicOperator,
} from '@mui/x-data-grid';
import { Paper, Chip } from '@mui/material';
import { Link } from '@mui/material';

import { dummyUsers, dummyAttendance } from './AttendDummy';

/* ---------- 타입 ---------- */
type Status = 'Active' | 'Inactive';

interface RowData {
  id: number;
  name: string;
  department: string;
  position: string;
  checkIn: string;
  checkOut: string;
  workTime: string;
  status: Status;
}

/* ---------- 출근시간, 퇴근시간, 근무시간 계산 ---------- */
function formatTime(datetime: string | null): string {
  if (!datetime) return '-';
  const date = new Date(datetime);
  return date.toTimeString().slice(0, 5); // HH:MM
}

function calcWorkTime(inTime: string | null, outTime: string | null): string {
  if (!inTime || !outTime) return '-';

  const inDate = new Date(inTime);
  const outDate = new Date(outTime);
  const diffMs = outDate.getTime() - inDate.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  const hours = Math.floor(diffMin / 60);
  const minutes = diffMin % 60;

  return `${hours}시간 ${minutes}분`;
}

/* ---------- rows 생성 ---------- */
const rows: RowData[] = dummyUsers.map((user) => {
  const records = dummyAttendance
    .filter((a) => a.user_id === user.id)
    .sort((a, b) => (b.attendance_date > a.attendance_date ? 1 : -1));

  const recent = records[0];

  return {
    id: user.id,
    name: user.name,
    department: user.department,
    position: user.position,
    checkIn: formatTime(recent?.clock_in_time ?? null),
    checkOut: formatTime(recent?.clock_out_time ?? null),
    workTime: calcWorkTime(recent?.clock_in_time ?? null, recent?.clock_out_time ?? null),
    status: user.status === 'ACTIVE' ? 'Active' : 'Inactive',
  };
});

/* ---------- columns ---------- */
const columns: GridColDef<RowData>[] = [
  {
    field: 'name',
    headerName: '이름',
    flex: 1,
    minWidth: 130,
    renderCell: ({ row }: GridRenderCellParams<RowData>) => (
      <Link
        component={RouterLink}
        to={`/attend/${row.id}`}
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
    renderCell: ({ value }: GridRenderCellParams<RowData, Status>) => (
      <Chip
        label={value === 'Active' ? '근무 중' : '휴직'}
        color={value === 'Active' ? 'success' : 'default'}
        size="small"
      />
    ),
  },
];

/* ---------- 컴포넌트 ---------- */
export default function AttendanceList() {
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
