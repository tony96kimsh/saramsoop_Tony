import {
  Avatar, Box, Button, Divider, Paper, Stack, Tab, Tabs, TextField, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
// import Header from '../components/Layout/Header';
import EmployeeTable from '../../components/employee/EmployeeTable';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../../components/employee/EmployeeProvider';
import { useState, useEffect } from 'react';
import type { EmployeeDetail } from '../../mock/Employees';

export default function TeamEmployeePage() {
  const { employees, setEmployees } = useEmployees();
  const myId = 1;                                // TODO: 실제 로그인 ID
  const me = employees.find(e => e.id === myId) as EmployeeDetail;
  const teamDept = me.department;
  const teamMembers = employees.filter(e => e.department === teamDept);
  const navigate = useNavigate(); 

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<EmployeeDetail | null>(null);
  const [tabIndex, setTabIndex] = useState(0); // 0 = 팀 동료, 1 = 내 정보

  useEffect(() => setForm(me), [me]);

  const tabTitle = tabIndex === 0 ? '부서 직원' : '내 정보';

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => setTabIndex(newValue);

  const editable: (keyof EmployeeDetail)[] = [
    'email', 'address', 'postal', 'bank', 'account', 'holder',
  ];
  const canEdit = (k: keyof EmployeeDetail) => editMode && editable.includes(k);

  const handleChange =
    (k: keyof EmployeeDetail) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => f ? { ...f, [k]: e.target.value } : f);

  const handleSave = () => {
    setEmployees(prev => prev.map(e => (e.id === myId ? { ...form! } : e)));
    setEditMode(false);
  };

  if (!form) return null;

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

  return (
    <>
      {/* <Header /> */}
      <Box sx={{ maxWidth: 'lg', mx: 'auto', my: 4, mt: 10, px: 2 }}>
        {/* ───── 상단 탭 ───── */}
        <Typography variant="h5" gutterBottom>{tabTitle}</Typography>
        <Tabs value={tabIndex} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="부서 직원" />
          <Tab label="내 정보" />
        </Tabs>
        
        {/* ───── 부서 직원 탭 ───── */}
        {tabIndex === 0 && (
          <>
            <Paper sx={{ maxWidth: 'xl', p: 3, mb: 5 }}>
              <EmployeeTable
                rows={teamMembers}
                onDetail={(id) => navigate(`/employee/${id}`, { state: { canEdit: false } })}
                showCheckbox={false}
              />
            </Paper>
          </>
        )}

        {/* ───── 내 정보 탭 ───── */}
        {tabIndex === 1 && (
          <>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ mb: 1 }}>
              {editMode ? (
                <Stack direction="row" gap={1}>
                  <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                    저장
                  </Button>
                  <Button variant="outlined" startIcon={<CloseIcon />} onClick={() => { setForm({...me}); setEditMode(false); }}>
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
                {/* 프로필 */}
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Avatar
                    src={`https://i.pravatar.cc/150?u=${myId}`}
                    alt={form.name}
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }}
                  />
                  <Typography variant="h6">{form.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Employee ID:&nbsp;{myId}
                  </Typography>
                </Box>

                {/* 필드 */}
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
    </>
  );
}
