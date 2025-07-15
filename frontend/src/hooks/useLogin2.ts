// hooks/useLogin2.ts
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const login = async (employeeNo: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log('🔐 일반 로그인 시도:', employeeNo);
      
      // 🔥 일반 로그인 API 호출
      const response = await fetch('http://localhost:5277/api/auth/dev-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeNo,
          password
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // 토큰과 사용자 정보 저장
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        console.log('✅ 일반 로그인 성공:', data);
        
        // 대시보드로 이동
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message || '로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('❌ 로그인 에러:', err);
      
      // 🔥 개발환경에서는 네트워크 에러 시 개발용 로그인으로 fallback
      if (import.meta.env.NODE_ENV === 'development') {
        console.log('🔧 네트워크 에러 - 개발용 로그인으로 fallback');
        try {
          await performDevLoginFallback();
        } catch (Error) {
          setError('로그인 서버에 연결할 수 없습니다.' + Error);
        }
      } else {
        setError('네트워크 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔥 개발용 fallback 로그인
  const performDevLoginFallback = async () => {
    const response = await fetch('http://localhost:5277/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'Admin',
        name: '개발자 (fallback)'
      })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      console.log('✅ 개발용 fallback 로그인 성공');
      navigate('/dashboard');
    } else {
      throw new Error('개발용 로그인도 실패');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return {
    login,
    logout,
    loading,
    error
  };
};