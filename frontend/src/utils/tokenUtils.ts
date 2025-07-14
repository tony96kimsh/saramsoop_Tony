// utils/tokenUtils.ts
export class TokenManager {
  private static readonly TOKEN_KEY = 'token';
  private static readonly USER_KEY = 'user';

  // 🔥 개발용 토큰 자동 설정
  static initializeDevToken(): boolean {
    if (import.meta.env.NODE_ENV !== 'development') {
      return false;
    }

    const existingToken = this.getToken();
    const devToken = import.meta.env.VITE_DEV_TOKEN;
    console.log("devToken>>>>>>>>>",devToken);
    
    if (!existingToken && devToken) {
      this.setToken(devToken);
      this.setUser({
        id: 1,
        name: '개발자',
        role: 'Admin',
        email: 'dev@example.com',
        empNo: 'DEV001'
      });
      
      console.log('🔧 TokenManager: 개발용 토큰 자동 설정');
      return true;
    }
    
    return false;
  }

  // 토큰 가져오기
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // 토큰 설정
  static setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log('✅ TokenManager: 토큰 설정됨');
  }

  // 토큰 제거
  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    console.log('🗑️ TokenManager: 토큰 제거됨');
  }

  // 사용자 정보 가져오기
  static getUser(): unknown | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    console.log('사용자정보 userStr>>> ',userStr);
    try {
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  // 사용자 정보 설정
  static setUser(user: unknown): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // 로그인 상태 확인
  static isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 토큰 상태 로그
  static logTokenStatus(): void {
    const token = this.getToken();
    const user = this.getUser();
    
    console.log('🔍 TokenManager 상태:'+token);
    console.log('   토큰:', token ? `${token.substring(0, 20)}...` : 'null');
    console.log('   사용자:', user?.name || 'null');
    console.log('   로그인 상태:', this.isLoggedIn());
  }

  // 🔥 강제 개발용 토큰 재설정 (디버깅용)
  static forceResetDevToken(): void {
    if (import.meta.env.NODE_ENV !== 'development') {
      console.warn('프로덕션 환경에서는 개발용 토큰을 설정할 수 없습니다.');
      return;
    }

    this.removeToken();
    const success = this.initializeDevToken();
    
    if (success) {
      console.log('🔄 개발용 토큰 강제 재설정 완료');
      window.location.reload(); // 페이지 새로고침
    } else {
      console.error('❌ 개발용 토큰 재설정 실패');
    }
  }
}

// 🔥 전역에서 사용할 수 있도록 window에 추가 (개발환경에서만)
if (import.meta.env.NODE_ENV === 'development') {
  (window as unknown).tokenManager = TokenManager;
  console.log('🔧 개발용: window.tokenManager 사용 가능');
  console.log('   - window.tokenManager.logTokenStatus()');
  console.log('   - window.tokenManager.forceResetDevToken()');
}