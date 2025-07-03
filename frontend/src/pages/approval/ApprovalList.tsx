import { employees } from '../../mock/Employees';
import ApprovalTable from '../../components/ApprovalTable';
import { Box, Button, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ApprovalList() {
  const navigate = useNavigate();
  return (
    <>
      <Box sx={{ maxWidth: 'xl', mx: 'auto', my: 4, mt: 10, px: 2 }}>
        <Toolbar sx={{justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h4">결재 관리</Typography>
          <Stack direction="row" gap={1}>
            <Button
              variant = "outlined"
              color = "primary"
              startIcon={<AddIcon/>}
              onClick={() => navigate('/employees/create')}
              sx={{backgroundColor: '#fff', '&:hover': {backgroundColor: '#1976D2', color: '#fff', borderColor: '#2E6C4D'}}}
            >
              직원 추가
            </Button>
            <Button variant = "outlined" color = "error" startIcon={<DeleteIcon />} sx={{backgroundColor: '#fff'}}
            >
              선택 삭제
            </Button>
          </Stack>
        </Toolbar>
        <Paper sx={{ p: 3 }}>
          <ApprovalTable 
              rows={employees} 
              onDetail={(id) => navigate(`/approval/${id}`, { state: { canEdit: true } })}
              dataType="user"
              showActions={true}
              showCheckbox={true}
            />
        </Paper>
      </Box>
    </>
  );
}
