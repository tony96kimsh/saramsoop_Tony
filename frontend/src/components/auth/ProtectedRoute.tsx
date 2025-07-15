// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles }) => {
  const { isLoggedIn, user, token, isLoading } = useAuth();
  const location = useLocation();

  console.log('🛡️ ProtectedRoute 체크:', {
    path: location.pathname,
    isLoading,
    isLoggedIn,
    hasToken: !!token,
    userRole: user?.role,
    userName: user?.name,
    requiredRoles,
    redirectTo: !isLoggedIn ? '/login' : null
  });

  // 1. 로딩 중일 때는 로딩 화면 표시
  if (isLoading) {
    console.log('⏳ AuthContext 초기화 중...');
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '16px'
      }}>
        로딩 중...
      </div>
    );
  }

  // 2. 로그인 체크
  if (!isLoggedIn || !user) {
    console.log('❌ 로그인되지 않음, 로그인 페이지로 리다이렉트');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. 권한 체크
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    console.log('❌ 권한 없음:', {
      userRole: user.role,
      requiredRoles,
      redirect: '/unauthorized'
    });
    return <Navigate to="/unauthorized" replace />;
  }

  console.log('✅ 인증 및 권한 체크 통과');
  return children;
};

export default ProtectedRoute;