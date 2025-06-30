// src/pages/TeamEmployeePage.tsx
import {
  Avatar, Box, Button, Collapse, Divider, IconButton,
  Paper, Stack, TextField, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/header';
import EmployeeTable from '../components/EmployeeTable';
import { useNavigate } from 'react-router-dom';
import { useEmployees } from '../components/useEmployees';
import { useState, useEffect } from 'react';
import type { EmployeeDetail } from '../mock/Employees';

/* ---------- 0. 토글 아이콘 ---------- */
interface ExpandMoreProps {
  expand?: boolean;
}
const ExpandMore = styled(
  IconButton,
  { shouldForwardProp: (prop) => prop !== 'expand' }
)<ExpandMoreProps>(({ theme, expand }) => ({
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TeamEmployeePage() {
  /* ---------- 1. 컨텍스트 & 로그인 사용자 ---------- */
  const { employees, setEmployees } = useEmployees();
  const myId = 1;                                // TODO: 실제 로그인 ID
  const me = employees.find(e => e.id === myId) as EmployeeDetail;
  const teamDept = me.department;
  const rows = employees.filter(e => e.department === teamDept);
  const navigate = useNavigate();

  /* ---------- 2. 상태 ---------- */
  const [openTeamList, setOpenTeamList] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<EmployeeDetail>(me);

  useEffect(() => setForm(me), [me]);

  /* ---------- 3. 편집 허용 필드 ---------- */
  const editable: (keyof EmployeeDetail)[] = [
    'email', 'address', 'postal', 'bank', 'account', 'holder',
  ];
  const canEdit = (k: keyof EmployeeDetail) => editMode && editable.includes(k);

  const handleChange =
    (k: keyof EmployeeDetail) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSave = () => {
    setEmployees(prev => prev.map(e => (e.id === myId ? { ...form } : e)));
    setEditMode(false);
  };

  /* ---------- 4. 상세 항목 정의 ---------- */
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
      <Header />
      <Box sx={{ maxWidth: 'xl', mx: 'auto', my: 4, mt: 10, px: 2 }}>

        {/* ───── 부서 직원 제목 + 토글 버튼 ───── */}
        <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            부서 직원
          </Typography>
          <ExpandMore
            expand={openTeamList}
            onClick={() => setOpenTeamList(o => !o)}
            aria-label="toggle team list"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>

        {/* ───── 팀 리스트 ───── */}
        <Collapse in={openTeamList} timeout="auto" unmountOnExit>
          <Paper sx={{ p: 3, mb: 5 }}>
            <EmployeeTable
              rows={rows}
              onDetail={(id) => navigate(`/employees/${id}`, { state: { canEdit: false } })}
              showCheckbox={false}
            />
          </Paper>
        </Collapse>

        {/* ───── 내 정보 제목 + 편집 버튼 ───── */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
          <Typography variant="h5">내 정보</Typography>

          {editMode ? (
            <Stack direction="row" gap={1}>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                저장
              </Button>
              <Button
                variant="outlined"
                startIcon={<CloseIcon />}
                onClick={() => { setForm(me); setEditMode(false); }}
              >
                취소
              </Button>
            </Stack>
          ) : (
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              onClick={() => setEditMode(true)}
            >
              내 정보 수정
            </Button>
          )}
        </Stack>

        {/* ───── 내 정보 카드 ───── */}
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
      </Box>
    </>
  );
}
