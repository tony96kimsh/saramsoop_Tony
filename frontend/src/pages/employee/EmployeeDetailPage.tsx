import {
  Avatar, Box, Button, Divider,
  Paper, Stack, TextField, Toolbar, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEmployees } from '../../components/employee/EmployeeProvider';
import type { Employee } from '../../components/employee/EmployeeTypes';
import { useEffect, useState } from 'react';

export default function EmployeeDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { employees, setEmployees } = useEmployees();
  const location = useLocation();
  const { canEdit = false } = (location.state || {}) as { canEdit?: boolean };

  const emp = employees.find(e => e.id === Number(id));

  const [editMode, setEditMode] = useState<boolean>(false);
  const toggleEdit = () => canEdit && setEditMode(true);

  const [form, setForm] = useState<Employee | null>(null);

  useEffect(() => {
    if (emp) setForm({ ...emp });
  }, [emp]);

  if (!emp || !form) {
    return <Typography sx={{ mt: 8, textAlign: 'center' }}>직원을 찾을 수 없습니다.</Typography>;
  }

  const handleChange = (k: keyof Employee) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => f ? { ...f, [k]: e.target.value } : f);

  const handleSave = () => {
    setEmployees(prev =>
      prev.map(e => (e.id === emp.id ? { ...form } : e))
    );
    setEditMode(false);
  };

  const rows: Array<[string, keyof Employee]> = [
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
    ['Hire / Resign', 'join'],
    ['Bank', 'bank'],
    ['Account Number', 'account'],
    ['Account Holder', 'holder'],
  ];

  return (
    <>
      <Box sx={{ maxWidth: 'md', mx: 'auto', my: 4, mt: 10, px: 2 }}>
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>

        <Toolbar sx={{ justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">직원 상세 정보</Typography>

          {canEdit && editMode && (
            <Stack direction="row" gap={1}>
              <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" startIcon={<CloseIcon />}
                onClick={() => { setForm({ ...emp }); setEditMode(false); }}>
                Cancel
              </Button>
            </Stack>
          )}

          {canEdit && !editMode && (
            <Button variant="outlined" startIcon={<EditIcon />} onClick={toggleEdit}>
              Edit
            </Button>
          )}
        </Toolbar>

        <Divider sx={{ mb: 4 }} />

        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            src={`https://i.pravatar.cc/150?u=${emp.id}`}
            alt={emp.name}
            sx={{ width: 120, height: 120, mx: 'auto', mb: 1 }}
          />
          {editMode ? (
            <TextField
              label="Name"
              value={form.name}
              onChange={handleChange('name')}
              size="small"
              sx={{ mb: 1 }}
            />
          ) : (
            <Typography variant="h6">{emp.name}</Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Employee ID:&nbsp;{emp.id}
          </Typography>
        </Box>

        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack divider={<Divider flexItem />} spacing={2}>
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

                {editMode ? (
                  <TextField
                    value={form[key] as string}
                    onChange={handleChange(key)}
                    size="small"
                  />
                ) : (
                  <Typography variant="body2">
                    {String(form[key])}
                  </Typography>
                )}
              </Box>
            ))}

            {editMode && (
              <>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    columnGap: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Hire Date
                  </Typography>
                  <TextField
                    value={form.join}
                    onChange={handleChange('join')}
                    size="small"
                  />
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    columnGap: 2,
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    Termination
                  </Typography>
                  <TextField
                    value={form.leave}
                    onChange={handleChange('leave')}
                    size="small"
                  />
                </Box>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
