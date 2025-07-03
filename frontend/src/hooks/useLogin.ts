import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';
import type { JwtPayload } from '../types/auth';


export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const login = async (employeeNo: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:5226/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: employeeNo, password }),
      });

      if (res.ok) {
        const data = await res.json();

        // ✅ JWT 저장
        localStorage.setItem('token', data.token);

        // ✅ 사용자 상태 저장
        const decoded = jwtDecode<JwtPayload>(data.token);
        setUser({ username: decoded.username, role: decoded.role });

        // 역할에 따라 페이지 이동
        switch (decoded.role) {
          case 'Admin':
            navigate('/admin');
            break;
          case 'Manager':
            navigate('/manager');
            break;
          case 'Employee':
            navigate('/employee');
            break;
          default:
            navigate('/unauthorized');
        }
      } else {
        setError('아이디 또는 비밀번호 오류');
      }
    } catch (err) {
      setError(err + '\n서버 연결 오류');
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
