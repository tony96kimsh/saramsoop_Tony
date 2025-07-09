import { mockUsers ,mockApprovals } from '../../mock/IApproval';
import ApprovalTable from '../../components/ApprovalTable';
import { Box, Button, Paper, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/layout/Header';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';


//관리자,팀장용 결재 리스트
//결재 : 사원,팀장은 admin, admin은 다른 admin에게 결재 가능
export default function ApprovalAdmin() {
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
              onClick={() => navigate('/approval/request')}
              sx={{backgroundColor: '#fff', '&:hover': {backgroundColor: '#1976D2', color: '#fff', borderColor: '#2E6C4D'}}}
            >
              결재 생성
              {/* 관리자는 결재 생성이 필요할까? */}
            </Button>
            <Button variant = "outlined" color = "error" startIcon={<DeleteIcon />} sx={{backgroundColor: '#fff'}}
            >
              선택 삭제
            </Button>
          </Stack>
        </Toolbar>
        <Paper sx={{ p: 3 }}>
          <ApprovalTable 
              rows={mockApprovals} 
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
