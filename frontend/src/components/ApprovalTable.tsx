import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  GridLogicOperator,
} from '@mui/x-data-grid';
import { Chip, Button, Stack, Typography } from '@mui/material';
import type {IUser, IApproval, Status } from '../mock/IApproval';

interface TableProps<T extends IUser | IApproval> {
  rows: T[];
  onDetail: (id: number) => void;
  showActions?: boolean;
  showCheckbox?: boolean;
  dataType: 'user' | 'approval'; // 데이터 타입 구분
}

const getChipProps = (value: string, dataType: 'user' | 'approval') => {
  if (dataType === 'user') {
    // IUser의 status용 chipMap
    const userChipMap = {
      'Active': { label: '활성', color: 'success' as const },
      'Inactive': { label: '비활성', color: 'error' as const },
      'Default': { label: '알 수 없음', color: 'default' as const }
    };
    return userChipMap[value as Status] || userChipMap['Default'];
  } else {
    // IApproval의 approval_status용 chipMap
    const approvalChipMap = {
      'Pending': { label: '결재중', color: 'info' as const },
      'Approved': { label: '승인', color: 'success' as const },
      'Rejected': { label: '반려', color: 'error' as const },
      'Default': { label: '알 수 없음', color: 'default' as const }
    };
    return approvalChipMap[value as keyof typeof approvalChipMap] || approvalChipMap['Default'];
  }
};
function makeUserColumns(goDetail: (id: number) => void, showActions = true): GridColDef<IUser>[] {
  const base: GridColDef<IUser>[] = [
    { field: 'name', headerName: '이름', flex: 0.6, minWidth: 120 },
    { field: 'position', headerName: '직급', flex: 0.5, minWidth: 90 },
    { field: 'email', headerName: '이메일', flex: 1.2, minWidth: 180 },
    { field: 'department', headerName: '부서', flex: 0.8, minWidth: 110 },
    { field: 'role', headerName: '권한', flex: 0.8, minWidth: 110 },
    {
      field: 'status',
      headerName: '상태',
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<IUser, Status>) => {
        const chipProps = getChipProps(value || 'approval','user');
        return (
          <Chip
            label={chipProps.label}
            color={chipProps.color}
            size="small"
          />
        );
      },
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

function makeApprovalColumns(goDetail: (id: number) => void, showActions = true): GridColDef<IApproval>[] {
  const base: GridColDef<IApproval>[] = [
    { field: 'approval_name', headerName: '요청자', flex: 0.6, minWidth: 120 },
    { field: 'reason', headerName: '사유', flex: 1.2, minWidth: 180 },
    { field: 'department', headerName: '부서', flex: 0.8, minWidth: 110 },
    { field: 'approval_type', headerName: '승인자', flex: 0.8, minWidth: 110 },
    {
      field: 'pending_time',
      headerName: '요청일',
      flex: 0.8,
      minWidth: 110,
      renderCell: ({ value }) => {
        if (!value) return '-';
        return new Date(value).toLocaleDateString('ko-KR');
      },
    },
    {
      field: 'approval_status',
      headerName: '결재상태',
      width: 150,
      renderCell: ({ value }: GridRenderCellParams<IApproval, string>) => {
        const chipProps = getChipProps(value || 'approval', 'user');
        return (
          <Chip
            label={chipProps.label}
            color={chipProps.color}
            size="small"
          />
        );
      },
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

export default function DataTable<T extends IUser | IApproval>({
  rows,
  onDetail,
  showActions = true,
  showCheckbox = true,
  dataType
}: TableProps<T>) {
  // 데이터 타입에 따라 적절한 컬럼 선택
  const columns = dataType === 'user' 
    ? makeUserColumns(onDetail, showActions) as GridColDef<T>[]
    : makeApprovalColumns(onDetail, showActions) as GridColDef<T>[];

  const fileName = dataType === 'user' ? 'users' : 'approvals';
  const countLabel = dataType === 'user' ? '명' : '건';

  return (
    <>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={showCheckbox}
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 25 } },
          filter: { filterModel: { items: [], quickFilterLogicOperator: GridLogicOperator.Or } },
        }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            csvOptions: { utf8WithBom: true, fileName },
            quickFilterProps: {
              quickFilterParser: (i: string) =>
                i.split(',').map(v => v.trim()).filter(Boolean),
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
          총 {rows.length}{countLabel}
        </Typography>
      </Stack>
    </>
  );
}