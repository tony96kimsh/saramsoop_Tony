import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResetPasswordConfirm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // TODO: 서버에 새 비밀번호 업데이트 요청
    alert('비밀번호가 성공적으로 변경되었습니다.');

    // 로그인 페이지로 이동
    navigate('/');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        새 비밀번호 설정
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="새 비밀번호"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="비밀번호 확인"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#447A5C' }}
        >
          비밀번호 변경
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordConfirm;
