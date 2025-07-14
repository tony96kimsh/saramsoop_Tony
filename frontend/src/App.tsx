import React, { useEffect } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import AppRoutes from './routes';
import { TokenManager } from './utils/tokenUtils';

const RoutesRenderer = () => {
  const element = useRoutes(AppRoutes);
  return element;
};



function App() {

  //앱 시작 시 토큰 초기화
  useEffect(() => {
    console.log('🚀 App 시작 - 토큰 초기화');
    
    // 개발용 토큰 자동 설정
    const tokenSet = TokenManager.initializeDevToken();
    
    if (tokenSet) {
      console.log('✅ 개발용 토큰이 자동으로 설정되었습니다');
    }
    
    // 현재 토큰 상태 로그
    TokenManager.logTokenStatus();
  }, []);

  return (
      <Router>
        {/* 🔥 개발환경에서 토큰 상태 표시 */}
        {import.meta.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          background: TokenManager.isLoggedIn() ? '#4caf50' : '#f44336',
          color: 'white',
          padding: '5px 10px',
          fontSize: '12px',
          zIndex: 9999,
          borderRadius: '0 0 0 5px',
          cursor: 'pointer'
        }}
        onClick={() => TokenManager.logTokenStatus()}
        title="클릭하면 토큰 상태를 콘솔에 출력합니다"
        >
          🔑 {TokenManager.isLoggedIn() ? 'Token: ✅' : 'Token: ❌'}
          {/* {TokenManager.getUser()?.role && ` (${TokenManager.getUser().role})`} */}
        </div>
      )}
        <RoutesRenderer />
      </Router>
  );
}

export default App;