import {
  Box, Button, Stack, Toolbar, Typography, Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../../components/employee/EmployeeProvider';
import type { Employee } from '../../components/employee/EmployeeProvider';
import EmployeeForm from '../../components/employee/EmployeeForm';

export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const { setEmployees } = useEmployees();

  const [employeeFormData, setEmployeeFormData] = useState<Employee>({
    id: Date.now(), // 숫자형 고유 ID 생성법 (UUID 숫자 변환 대신)
    name: '',
    role: 'EMPLOYEE',
    birth: '',
    phone: '',
    email: '',
    address: '',
    postal: '',
    department: '',
    position: '',
    career: '',
    join: '',
    leave: '',
    bank: '',
    account: '',
    holder: '',
    status: 'Active',
  });

  const handleEmployeeSubmit = () => {
    setEmployees(prev => [...prev, employeeFormData]);
    navigate('/employeepage');
  };

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto', mt: 10, px: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>

      <Toolbar sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">직원 등록</Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleEmployeeSubmit}
        >
          등록
        </Button>
      </Toolbar>

      <Divider sx={{ mb: 4 }} />

      <EmployeeForm
        employeeFormData={employeeFormData}
        setEmployeeFormData={setEmployeeFormData}
      />
    </Box>
  );
}
