import {
  Avatar, Box, Button, Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper, Select, Stack, TextField, Toolbar, Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../../components/EmployeeProvider';
import { useState } from 'react';
import type { EmployeeDetail } from '../../mock/Employees';
import type { Role } from '../../types/role';
import type { SelectChangeEvent } from '@mui/material/Select';

export default function EmployeeCreatePage() {
  const navigate = useNavigate();
  const { setEmployees } = useEmployees();

  // 빈 폼 초기값 (기본 구조만 설정)
  const [form, setForm] = useState<EmployeeDetail>({
    id: Date.now(), // 아래 방법은 삭제하고 나면 중복될 수 있으니 유니크 값으로 임시 설정
    // id: employees.length + 1, // 단순 auto-increment
    name: '',
    role: 'Employee',
    birth: '',
    regNo: '',
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
    status: 'Active', // 기본값
  });

  const handleChange = (key: keyof EmployeeDetail) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [key]: e.target.value }));

  const handleRoleChange = (e: SelectChangeEvent) => {
    setForm(f => ({ ...f, role: e.target.value as Role }));
  };

  const handleSubmit = () => {
    setEmployees(prev => [...prev, form]);
    navigate('/employeepage'); // 리스트 페이지로 이동
  };

  const rows: Array<[string, keyof EmployeeDetail]> = [
    ['Name', 'name'],
    ['Role', 'role'],
    ['Date of Birth', 'birth'],
    ['Phone Number', 'phone'],
    ['Email', 'email'],
    ['Address', 'address'],
    ['Zip Code', 'postal'],
    ['Department', 'department'],
    ['Position', 'position'],
    ['Years of Experience', 'career'],
    ['Hire Date', 'join'],
    ['Resign Date', 'leave'],
    ['Bank', 'bank'],
    ['Account Number', 'account'],
    ['Account Holder', 'holder'],
  ];

  return (
    <Box sx={{ maxWidth: 'md', mx: 'auto', my: 4, mt: 10, px: 2 }}>
      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Stack>

      <Toolbar sx={{ justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">직원 등록</Typography>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSubmit}>
          등록
        </Button>
      </Toolbar>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Avatar
          src={`https://i.pravatar.cc/150?u=new-${form.id}`}
          sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }}
        />
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack divider={<Divider flexItem />} spacing={2}>
          {/* 👇 Role 필드는 드롭다운으로 따로 분리 */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: 2,
              alignItems: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Role
            </Typography>
            <FormControl size="small" fullWidth>
              <InputLabel id="role-label">역할</InputLabel>
              <Select
                labelId="role-label"
                value={form.role}
                label="역할"
                onChange={handleRoleChange}
              >
                <MenuItem value="Admin">관리자</MenuItem>
                <MenuItem value="Manager">팀장</MenuItem>
                <MenuItem value="Employee">사원</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {rows.map(([label, key]) => (
            <Box
              key={label}
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                columnGap: 2,
                alignItems: 'center',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {label}
              </Typography>
              <TextField
                value={form[key]}
                onChange={handleChange(key)}
                size="small"
              />
            </Box>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
}
