import {
  Avatar, Box, Button, Divider, Paper,
  Stack, Tab, Tabs, TextField, Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EmployeeTable from './EmployeeTable';
import { useNavigate } from 'react-router-dom';
import type { Employee } from './EmployeeTypes';
import { useEffect, useState } from 'react';

interface EmployeeTabsProps {
  userId: number;
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE';
  employees: Employee[];
  setEmployees: React.Dispatch<React.SetStateAction<Employee[]>>;
  showAddButton?: boolean;
  showDeleteButton?: boolean;
  showCheckbox?: boolean;
  showActions?: boolean;
}

export default function EmployeeTabs({
  userId,
  role,
  employees,
  setEmployees,
  showAddButton = false,
  showDeleteButton = false,
  showCheckbox = true,
  showActions = true,
}: EmployeeTabsProps) {
  const navigate = useNavigate();
  const me = employees.find(e => e.id === userId) as Employee;
  const isAdmin = role === 'ADMIN';
  const isManager = role === 'MANAGER';
  // const isEmployee = role === 'Employee';

  const visibleEmployees = isAdmin
    ? employees
    : employees.filter(e => e.department === me.department);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<Employee | null>(null);
  const [tabIndex, setTabIndex] = useState(0); 
  // 체크박스 선택된 인원 선택 삭제
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);

  const tabTitle =
    tabIndex === 0
      ? role === 'ADMIN'
        ? '전체 직원'
        : role === 'MANAGER'
        ? '부서 직원'
        : '팀 동료'
      : '내 정보';

  useEffect(() => {
    if (me) setForm(me);
  }, [me]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const editable: (keyof Employee)[] =
    role === 'ADMIN'
      ? (me ? Object.keys(me) as (keyof Employee)[] : [])
      : ['email', 'address', 'postal', 'bank', 'account', 'holder'];

  const canEdit = (k: keyof Employee) => editMode && editable.includes(k);

  const handleChange =
    (k: keyof Employee) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => f ? { ...f, [k]: e.target.value } : f);

  const handleSave = () => {
    setEmployees(prev => prev.map(e => (e.id === userId ? { ...form! } : e)));
    setEditMode(false);
  };

  const rowsDef: [string, keyof Employee][] = [
    ['Name', 'name'], ['Role', 'role'], ['Date of Birth', 'birth'], ['Phone Number', 'phone'],
    ['Email', 'email'], ['Address', 'address'], ['Zip Code', 'postal'], ['Department', 'department'],
    ['Position', 'position'], ['Years of Experience', 'career'], ['Hire Date', 'join'],
    ['Resign Date', 'leave'], ['Bank', 'bank'], ['Account Number', 'account'], ['Account Holder', 'holder'],
  ];

  if (!form) return null;

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 10, px: 2 }}>
      <Typography variant="h5" gutterBottom>{tabTitle}</Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label={role === 'ADMIN' ? '전체 직원' : role === 'MANAGER' ? '부서 직원' : '팀 동료'} />
        <Tab label="내 정보" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 2 }}>
            {(role === 'ADMIN') && (
              <Stack direction="row" gap={1}>
                {showAddButton && (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => navigate('/employee/create')}
                    sx={{ backgroundColor: '#fff', '&:hover': { backgroundColor: '#1976D2', color: '#fff' } }}
                  >직원 추가</Button>
                )}
                {showDeleteButton && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      console.log('삭제할 IDs:', selectedEmployeeIds);
                      if (selectedEmployeeIds.length === 0) return;
                      setEmployees(prev => prev.filter(e => !selectedEmployeeIds.includes(e.id)));
                      setSelectedEmployeeIds([]); // 선택 해제
                    }}
                    sx={{ backgroundColor: '#fff' }}
                  >선택 삭제</Button>
                )}
              </Stack>
            )}
          </Stack>

          <Paper sx={{ p: 3, mb: 5 }}>
            <EmployeeTable
              rows={visibleEmployees}
              onDetail={(id) => navigate(`/employee/${id}`, { state: { canEdit: isAdmin } })}
              showCheckbox={showCheckbox && isAdmin}
              showActions={showActions && (isAdmin || isManager)}
              onSelectionChange={setSelectedEmployeeIds}
            />
          </Paper>
        </>
      )}


      {tabIndex === 1 && (
        <>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 1 }}>
            {editMode ? (
              <Stack direction="row" gap={1}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>저장</Button>
                <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => { setForm({ ...me }); setEditMode(false); }}>취소</Button>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{ backgroundColor: '#fff', '&:hover': { backgroundColor: '#1976D2', color: '#fff' } }}
              >내 정보 수정</Button>
            )}
          </Stack>

          <Paper sx={{ p: 3 }}>
            <Stack divider={<Divider flexItem />} spacing={2}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar src={`https://i.pravatar.cc/150?u=${userId}`} alt={form.name} sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }} />
                <Typography variant="h6">{form.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Employee ID:&nbsp;{userId}
                </Typography>
              </Box>

              {rowsDef.map(([label, key]) => (
                <Box key={label} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 2, alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  {canEdit(key) ? (
                    <TextField value={form[key]} onChange={handleChange(key)} size="small" />
                  ) : (
                    <TextField
                      value={key === 'join' ? form.join : key === 'leave' ? form.leave : form[key]}
                      size="small"
                      disabled
                      InputProps={{ disableUnderline: true }}
                      variant="standard"
                    />
                  )}
                </Box>
              ))}
            </Stack>
          </Paper>
        </>
      )}
    </Box>
  );
}
