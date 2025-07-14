import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridLogicOperator,
} from '@mui/x-data-grid';
import { Paper, Chip, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
        to={`/attendance/${row.id}`}
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
  const [rows, setRows] = useState<RowData[]>([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<RowData[]>('http://localhost:5277/api/attendance/summary');
        setRows(res.data);
      } catch (error) {
        console.error('근태 목록 로딩 실패:', error);
      }
    };

    fetchData();
  }, []);

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
