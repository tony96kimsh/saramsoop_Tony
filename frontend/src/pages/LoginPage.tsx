import { Box, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  const handleLogin = async (employeeNo: string, password: string) => {
    try {
      const res = await fetch('http://localhost:5226/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: employeeNo, password }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(`${data.username} 님 (${data.role}) 로그인 성공`);
        // 페이지 이동 등 처리
      } else {
        alert('아이디 또는 비밀번호 오류');
      }
    } catch (err) {
      alert(err + ' 서버 연결 오류');
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: '100%',
          maxWidth: 380,
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
          transform: 'translateY(-10%)',
        }}
      >
        <LoginForm onSubmit={handleLogin} />
      </Paper>
    </Box>
  );
};

export default LoginPage;
