import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import logo from '../../assets/logo.png';

interface LoginFormProps {
  onSubmit: (employeeNo: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [employeeNo, setEmployeeNo] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeNo.trim() || !password.trim()) {
      alert('사원 번호와 비밀번호를 입력해주세요.');
      return;
    }
    onSubmit(employeeNo, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 로고 */}
      <Box mb={2}>
        <img src={logo} alt="logo" style={{ width: 110, height: 110 }} />
      </Box>

      {/* 제목 */}
      <Typography variant="h5" fontWeight="bold" mb={1}>
        사람이 숨쉬는 조직, 사람숲
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        계정에 로그인하세요
      </Typography>

      {/* 입력 필드 */}
      <TextField
        fullWidth
        label="사원 번호"
        placeholder="ID"
        variant="filled"
        size="small"
        margin="normal"
        value={employeeNo}
        onChange={(e) => setEmployeeNo(e.target.value)}
        autoComplete="username"
      />
      <TextField
        fullWidth
        label="비밀번호"
        placeholder="••••••••"
        type="password"
        variant="filled"
        size="small"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      {/* 로그인 버튼 */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: '#447A5C',
          fontWeight: 'bold',
        }}
      >
        로그인
      </Button>

      {/* 하단 안내 */}
      <Box mt={2}>
        <Typography sx={{ color: '#447A5C', fontSize: '0.875rem' }}>
          비밀번호 재설정
        </Typography>
      </Box>
    </form>
  );
};

export default LoginForm;
