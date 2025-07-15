import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Divider, Stack, Chip, Alert } from '@mui/material';
import logo from '/logo.png';
import { Link } from 'react-router-dom';
import { TokenManager } from '../../utils/tokenUtils';

interface LoginFormProps {
  onSubmit: (employeeNo: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [employeeNo, setEmployeeNo] = useState('');
  const [password, setPassword] = useState('');
  const [devLoading, setDevLoading] = useState(false);
  const [devError, setDevError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeNo.trim() || !password.trim()) {
      alert('사원 번호와 비밀번호를 입력해주세요.');
      return;
    }
    onSubmit(employeeNo, password);
  };

  // 🔥 개발용 로그인 함수
  const handleDevLogin = async (role: 'Admin' | 'Manager' | 'Employee') => {
    setDevLoading(true);
    setDevError(null);
    
    try {
      console.log(`🔐 ${role}로 개발용 로그인 시도`);
      
      const response = await fetch('http://localhost:5277/api/auth/dev-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: role,
          name: `개발자-${role}`
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // 토큰과 사용자 정보 저장
        TokenManager.setToken(data.token);
        TokenManager.setUser(data.user);
        
        console.log('✅ 개발용 로그인 성공:', data);
        TokenManager.logTokenStatus();
        
        // 성공 시 페이지 이동 (또는 상태 업데이트)
         setTimeout(() => {
          window.location.href = '/dashboard'; 
        }, 500); 
      } else {
        const errorData = await response.json();
        setDevError(errorData.message || '개발용 로그인 실패');
      }
    } catch (err) {
      setDevError('네트워크 오류: ' + (err instanceof Error ? err.message : '알 수 없는 오류'));
      console.error('❌ 개발용 로그인 에러:', err);
    } finally {
      setDevLoading(false);
    }
  };

  // 🔥 현재 로그인 상태 확인 (디버깅용)
  const checkCurrentStatus = () => {
    console.log('🔍 현재 TokenManager 상태:');
    TokenManager.logTokenStatus();
    alert(`로그인 상태: ${TokenManager.isLoggedIn() ? '로그인됨' : '로그아웃됨'}`);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        {/* 로고 */}
        <Box mb={2}>
          <img src={logo} alt="logo" style={{ width: 110, height: 110 }} />
        </Box>

        {/* 제목 */}
        <Typography variant="h5" fontWeight="bold" mb={1}>
          사람이 숨쉬는 조직, 사람숲
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
          <Link to="/reset-password" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ color: '#447A5C' }}>
              비밀번호 재설정
            </Typography>
          </Link>
        </Box>
      </form>

      {/* 🔥 개발 환경에서만 표시되는 개발용 로그인 */}
      {import.meta.env.NODE_ENV === 'development' && (
        <Box sx={{ mt: 3 }}>
          <Divider sx={{ my: 2 }}>
            <Chip 
              label="개발용 로그인" 
              size="small" 
              sx={{ 
                backgroundColor: '#fff3e0', 
                color: '#f57c00',
                fontSize: '0.75rem'
              }} 
            />
          </Divider>

           {/* 🔥 현재 로그인 상태 표시 */}
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <Chip 
              label={TokenManager.isLoggedIn() ? `로그인됨: ${TokenManager.getUser()?.name}` : '로그아웃 상태'}
              color={TokenManager.isLoggedIn() ? 'success' : 'default'}
              size="small"
              onClick={checkCurrentStatus}
              sx={{ cursor: 'pointer' }}
            />
          </Box>

          {/* 개발용 에러 메시지 */}
          {devError && (
            <Alert severity="error" sx={{ mb: 2, fontSize: '0.8rem' }}>
              {devError}
            </Alert>
          )}

          <Typography 
            variant="caption" 
            display="block" 
            textAlign="center" 
            sx={{ mb: 1, color: '#666' }}
          >
            개발/테스트용 빠른 로그인
          </Typography>

          <Stack spacing={1}>
            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => handleDevLogin('Admin')}
              disabled={devLoading}
              sx={{
                borderColor: '#f44336',
                color: '#f44336',
                '&:hover': {
                  backgroundColor: '#ffebee',
                  borderColor: '#f44336',
                },
                fontSize: '0.8rem',
                py: 0.5
              }}
              startIcon={<Chip label="관리자" size="small" color="error" />}
            >
              관리자로 로그인
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => handleDevLogin('Manager')}
              disabled={devLoading}
              sx={{
                borderColor: '#ff9800',
                color: '#ff9800',
                '&:hover': {
                  backgroundColor: '#fff3e0',
                  borderColor: '#ff9800',
                },
                fontSize: '0.8rem',
                py: 0.5
              }}
              startIcon={<Chip label="매니저" size="small" color="warning" />}
            >
              매니저로 로그인
            </Button>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              onClick={() => handleDevLogin('Employee')}
              disabled={devLoading}
              sx={{
                borderColor: '#2196f3',
                color: '#2196f3',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                  borderColor: '#2196f3',
                },
                fontSize: '0.8rem',
                py: 0.5
              }}
              startIcon={<Chip label="직원" size="small" color="info" />}
            >
              직원으로 로그인
            </Button>
          </Stack>

          {devLoading && (
            <Typography 
              variant="caption" 
              display="block" 
              textAlign="center" 
              sx={{ mt: 1, color: '#666' }}
            >
              개발용 로그인 중...
            </Typography>
          )}

          <Typography 
            variant="caption" 
            display="block" 
            textAlign="center" 
            sx={{ mt: 1, color: '#999', fontSize: '0.7rem' }}
          >
            ⚠️ 개발환경에서만 표시됩니다
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LoginForm;