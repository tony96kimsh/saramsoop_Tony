// App.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import AppRoutes from './routes';
import { TokenManager } from './utils/tokenUtils';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const RoutesRenderer = () => {
  const element = useRoutes(AppRoutes);
  return element;
};

// 개발환경 토큰 상태 표시 컴포넌트 (AuthContext 사용)
const DevTokenStatus = () => {
  const { token, user, isLoggedIn } = useAuth();

  if (import.meta.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        background: isLoggedIn ? '#4caf50' : '#f44336',
        color: 'white',
        padding: '5px 10px',
        fontSize: '12px',
        zIndex: 9999,
        borderRadius: '0 0 0 5px',
        cursor: 'pointer'
      }}
      onClick={() => {
        console.log('🔍 현재 AuthContext 상태:');
        console.log('   토큰:', token ? `${token.substring(0, 20)}...` : 'null');
        console.log('   사용자:', user?.name || 'null');
        console.log('   로그인 상태:', isLoggedIn);
        console.log('   사용자 권한:', user?.role || 'null');
        
        // TokenManager 상태도 함께 출력
        console.log('🔍 TokenManager 상태:');
        TokenManager.logTokenStatus();
      }}
      title="클릭하면 토큰 상태를 콘솔에 출력합니다"
    >
      🔑 {isLoggedIn ? 'Token: ✅' : 'Token: ❌'}
      {user?.role && ` (${user.role})`}
    </div>
  );
};

// 토큰 초기화 컴포넌트
const TokenInitializer = () => {
  const { initializeDevToken } = useAuth();

  useEffect(() => {
    console.log('🚀 App 시작 - 토큰 초기화');
    
    // 개발용 토큰 자동 설정 (AuthContext 사용)
    const tokenSet = initializeDevToken();
    
    if (tokenSet) {
      console.log('✅ 개발용 토큰이 자동으로 설정되었습니다');
    }
    
    // 현재 토큰 상태 로그
    TokenManager.logTokenStatus();
  }, [initializeDevToken]);

  return null;
};

const AppContent = () => {
  return (
    <>
      <TokenInitializer />
      <DevTokenStatus />
      <RoutesRenderer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;