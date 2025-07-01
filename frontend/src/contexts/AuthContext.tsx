import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

interface JwtPayload {
  username: string;
  role: string;
  exp: number; // UNIX timestamp (seconds)
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // 토큰에서 사용자 정보 파싱
  const loadUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            username: decoded.username,
            role: decoded.role,
          });
        } else {
          localStorage.removeItem('token'); // 만료된 토큰 제거
        }
      } catch (err) {
        localStorage.removeItem('token'); // 잘못된 토큰 제거
      }
    }
  };

  useEffect(() => {
    loadUserFromToken(); // 앱 로드시 실행
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
