// components/employee/EmployeeForm.tsx
import {
  Avatar, Box, Divider, FormControl, InputLabel, MenuItem,
  Paper, Select, Stack, TextField, Typography,
} from '@mui/material';
import type { EmployeeDetail } from '../../mock/Employees';
import type { Role } from '../../types/role';
import type { SelectChangeEvent } from '@mui/material/Select';

interface EmployeeFormProps {
  employeeFormData: EmployeeDetail;
  setEmployeeFormData: React.Dispatch<React.SetStateAction<EmployeeDetail>>;
  showAvatar?: boolean;
}

const employeeFields: Array<[string, keyof EmployeeDetail]> = [
  ['Name', 'name'],
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

export default function EmployeeForm({ employeeFormData, setEmployeeFormData, showAvatar = true }: EmployeeFormProps) {
  const handleInputChange = (key: keyof EmployeeDetail) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeFormData(prev => ({ ...prev, [key]: e.target.value }));
  };

  const handleRoleChange = (e: SelectChangeEvent) => {
    setEmployeeFormData(prev => ({ ...prev, role: e.target.value as Role }));
  };

  return (
    <>
      {showAvatar && (
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar src={`https://i.pravatar.cc/150?u=new-${employeeFormData.id}`} sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }} />
        </Box>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack divider={<Divider flexItem />} spacing={2}>
          {/* Role 드롭다운 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">Role</Typography>
            <FormControl size="small" fullWidth>
              <InputLabel id="employee-role-label">역할</InputLabel>
              <Select
                labelId="employee-role-label"
                value={employeeFormData.role}
                label="역할"
                onChange={handleRoleChange}
              >
                <MenuItem value="Admin">관리자</MenuItem>
                <MenuItem value="Manager">팀장</MenuItem>
                <MenuItem value="Employee">사원</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {employeeFields.map(([label, key]) => (
            <Box
              key={key}
              sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, alignItems: 'center' }}
            >
              <Typography variant="body2" color="text.secondary">{label}</Typography>
              <TextField
                value={employeeFormData[key]}
                onChange={handleInputChange(key)}
                size="small"
              />
            </Box>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
