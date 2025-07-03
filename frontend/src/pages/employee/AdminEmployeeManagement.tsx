import {
  Avatar, Box, Button, Divider, Paper, Stack, TextField, Typography, Tabs, Tab
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EmployeeTable from '../../components/EmployeeTable';
import { useEmployees } from '../../components/EmployeeProvider';
import { useEffect, useState } from 'react';
import type { EmployeeDetail } from '../../mock/Employees';
import { useNavigate } from 'react-router-dom';

export default function AdminEmployeePage() {
  const { employees, setEmployees } = useEmployees();
  const adminId = 11; // TODO: 실제 로그인 ID
  const me = employees.find(e => e.id === adminId) as EmployeeDetail;

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<EmployeeDetail | null>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 = 전체직원, 1 = 내정보
  const navigate = useNavigate();

  useEffect(() => setForm(me), [me]);

  const tabTitle = tabIndex === 0 ? '전체 직원' : '내 정보';
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const editable = Object.keys(me) as (keyof EmployeeDetail)[]; // 전체 필드 수정 가능
  const canEdit = (k: keyof EmployeeDetail) => editMode && editable.includes(k);

  const handleChange =
    (k: keyof EmployeeDetail) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => f ? { ...f, [k]: e.target.value } : f);

  const handleSave = () => {
    setEmployees(prev => prev.map(e => (e.id === adminId ? { ...form! } : e)));
    setEditMode(false);
  };

  const rowsDef: [string, keyof EmployeeDetail][] = [
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

  if (!form) return null;

  return (
    <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: 10, px: 2 }}>
      <Typography variant="h5" gutterBottom>{tabTitle}</Typography>
      <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
        <Tab label="전체 직원" />
        <Tab label="내 정보" />
      </Tabs>

      {tabIndex === 0 && (
        <>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6">전체 직원 목록</Typography>
            <Stack direction="row" gap={1}>
              <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                onClick={() => navigate('/employees/create')}
                sx={{ backgroundColor: '#fff', '&:hover': { backgroundColor: '#1976D2', color: '#fff' } }}
              >
                직원 추가
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                sx={{ backgroundColor: '#fff' }}
              >
                선택 삭제
              </Button>
            </Stack>
          </Stack>
          <Paper sx={{ p: 3 }}>
            <EmployeeTable rows={employees} onDetail={(id) => navigate(`/employees/${id}`, { state: { canEdit: true } })} />
          </Paper>
        </>
      )}

      {tabIndex === 1 && (
        <>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 1 }}>
            {editMode ? (
              <Stack direction="row" gap={1}>
                <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                  저장
                </Button>
                <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => { setForm({ ...me }); setEditMode(false); }}>
                  취소
                </Button>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setEditMode(true)}
                sx={{
                  backgroundColor: '#fff',
                  '&:hover': { backgroundColor: '#1976D2', color: '#fff', borderColor: '#2E6C4D' },
                }}
              >
                내 정보 수정
              </Button>
            )}
          </Stack>

          <Paper sx={{ p: 3 }}>
            <Stack divider={<Divider flexItem />} spacing={2}>
              <Box sx={{ textAlign: 'center', mb: 2 }}>
                <Avatar
                  src={`https://i.pravatar.cc/150?u=${adminId}`}
                  alt={form.name}
                  sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }}
                />
                <Typography variant="h6">{form.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Employee ID:&nbsp;{adminId}
                </Typography>
              </Box>

              {rowsDef.map(([label, key]) => (
                <Box
                  key={label}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    columnGap: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">{label}</Typography>
                  {canEdit(key) ? (
                    <TextField
                      value={form[key]}
                      onChange={handleChange(key)}
                      size="small"
                    />
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
