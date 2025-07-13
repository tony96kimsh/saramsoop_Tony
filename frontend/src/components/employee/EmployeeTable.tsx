import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridLogicOperator,
} from '@mui/x-data-grid';
import { Chip, Button, Stack, Typography } from '@mui/material';
import type { Employee, Status } from './EmployeeTypes';

interface EmployeeTableProps {
  rows: Employee[];
  onDetail: (id: number) => void;
  showActions?: boolean;
  showCheckbox?: boolean;
  onSelectionChange?: (selectedIds: number[]) => void;
}

function makeColumns(
  goDetail: (id: number) => void,
  showActions = true
): GridColDef<Employee>[] {
  const base: GridColDef<Employee>[] = [
    { field: 'id', headerName: '사원번호', flex: 0.3, minWidth: 70 },
    { field: 'name', headerName: '이름', flex: 0.6, minWidth: 120 },
    { field: 'position', headerName: '직급', flex: 0.5, minWidth: 90 },
    { field: 'email', headerName: '이메일', flex: 1.2, minWidth: 180 },
    { field: 'department', headerName: '부서', flex: 0.8, minWidth: 110 },
    {
      field: 'status',
      headerName: '상태',
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<Employee, Status>) => (
        <Chip
          label={value === 'Active' ? '재직' : '휴직'}
          color={value === 'Active' ? 'success' : 'default'}
          size="small"
        />
      ),
    },
  ];

  if (showActions) {
    base.push({
      field: 'actions',
      headerName: '작업',
      width: 150,
      sortable: false,
      filterable: false,
      disableExport: true,
      renderCell: ({ row }) => (
        <Button size="small" onClick={() => goDetail(row.id)}>
          상세 보기
        </Button>
      ),
    });
  }

  return base;
}

export default function EmployeeTable({
  rows,
  onDetail,
  showActions = true,
  showCheckbox = true,
  onSelectionChange,
}: EmployeeTableProps) {
  const columns = makeColumns(onDetail, showActions);

  // ✅ 여기에 디버깅 로그 추가
  console.log('✅ [EmployeeTable] rows 전달됨:', rows);
  console.log('✅ [EmployeeTable] rows id 타입:', rows.map(r => [typeof r.id, r.id]));

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => String(row.id)}  // 강제 string 처리로 일관성 확보
        checkboxSelection={showCheckbox}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(newSelectionModel) => {
          let selectedIds: number[] = [];

          if (Array.isArray(newSelectionModel)) {
            selectedIds = newSelectionModel.map(id => Number(id));
          } else if (
            typeof newSelectionModel === 'object' &&
            newSelectionModel?.ids instanceof Set
          ) {
            selectedIds = Array.from(newSelectionModel.ids).map(id => Number(id));
          }

          console.log('🟢 최종 selectedIds:', selectedIds);

          if (onSelectionChange) {
            onSelectionChange(selectedIds);
          }
        }}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 25 } },
          filter: { filterModel: { items: [], quickFilterLogicOperator: GridLogicOperator.Or } },
        }}
        showToolbar
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions: { utf8WithBom: true, fileName: 'employees_list' },
            quickFilterProps: {
              quickFilterParser: (input: string) =>
                input.split(',').map(v => v.trim()).filter(Boolean),
            },
          },
        }}
        sx={{
          border: 0,
          '.MuiDataGrid-columnHeaders': { backgroundColor: '#f9fafb' },
          '.MuiDataGrid-row:hover': { backgroundColor: '#f3f4f6' },
        }}
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 1, px: 0.5 }}
      >
        <Typography variant="body2" color="text.secondary">
          총 {rows.length}명
        </Typography>
      </Stack>
    </>
  );
}
