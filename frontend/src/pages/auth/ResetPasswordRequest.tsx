import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const ResetPasswordRequest = () => {
  const [employeeNo, setEmployeeNo] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 호출로 이메일과 사원번호 유효성 확인 → 메일 전송
    alert('입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.');
  };

  return (
    <Box maxWidth={400} mx="auto" mt={8}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        비밀번호 재설정
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="사원 번호"
          value={employeeNo}
          onChange={(e) => setEmployeeNo(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, backgroundColor: '#447A5C' }}
        >
          재설정 링크 전송
        </Button>
      </form>
    </Box>
  );
};

export default ResetPasswordRequest;
