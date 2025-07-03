import { Box, Paper, Typography } from '@mui/material';
import LoginForm from '../../components/auth/LoginForm';
import { useLogin } from '../../hooks/useLogin';
import '../../style/LoginPage.css';

const LoginPage = () => {
  const { login, loading, error } = useLogin();

  const handleLogin = (id: string, pw: string) => {
    login(id, pw);
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
        }}
      >
        <LoginForm onSubmit={handleLogin} />
        {loading && <Typography>로그인 중...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Paper>
    </Box>
  );
};

export default LoginPage;
