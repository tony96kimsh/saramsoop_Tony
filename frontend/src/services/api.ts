export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  success: boolean;
  errors?: string[];
}

export interface PaginationRequest {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5277/api';
     console.log('🔗 API Base URL >>>', this.baseURL);

     // 개발환경에서 자동 토큰 설정
    this.initializeDevToken();
  }

  // 🔥 개발용 토큰 자동 초기화
  private initializeDevToken(): void {
    // 개발환경이 아니면 무시
    if (import.meta.env.NODE_ENV !== 'development') {
      return;
    }

    const existingToken = localStorage.getItem('token');
    const devToken = import.meta.env.VITE_DEV_TOKEN;
    console.log("devToken>>",devToken);
    
    // 토큰이 없고 환경변수에 개발용 토큰이 있으면 localstorage에 set 함.
    if (!existingToken && devToken) {
      localStorage.setItem('token', devToken);
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        name: '개발자',
        role: 'Admin',
        email: 'dev@example.com',
        empNo: 'DEV001'
      }));
      console.log('🔧 개발용 토큰 자동 설정 완료');
      console.log('🎯 토큰:', devToken.substring(0, 30) + '...');
    } else if (existingToken) {
      console.log('✅ 기존 토큰 존재:', existingToken.substring(0, 30) + '...');
    } else {
      console.log('⚠️ 개발용 토큰이 환경변수에 설정되지 않음');
    }
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');

    console.log(`토큰 >>>> ${token}`);

    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }


  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        // 토큰 만료 시 로그인 페이지로 리다이렉트
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('인증이 필요합니다.');
      }
      
      if (response.status === 403) {
        throw new Error('접근 권한이 없습니다.');
      }

      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        console.error('📡 Failed to parse error response');
      }
      
      throw new Error(errorMessage);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return response.text() as unknown as T;
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    // Vite Proxy 사용 시 상대 경로 처리
    let fullUrl: string;
    
    if (this.baseURL.startsWith('/')) {
      // 상대 경로인 경우 (Vite Proxy 사용)
      fullUrl = `${this.baseURL}${endpoint}`;
      console.log("📡 상대경로>> (Proxy):", fullUrl);
    } else {
      // 절대 경로인 경우 (Direct 방식)
      const url = new URL(`${this.baseURL}${endpoint}`);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            url.searchParams.append(key, value.toString());
          }
        });
      }
      fullUrl = url.toString();
      console.log("📡get() 절대경로>> (Direct):", fullUrl);
    }

    // 상대 경로일 때 쿼리 파라미터 수동 추가
    if (this.baseURL.startsWith('/') && params) {
      const queryParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
      
      if (queryParams.toString()) {
        fullUrl += `?${queryParams.toString()}`;
      }
    }

    console.log("🚀get() Final URL:", fullUrl);

    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    const fullUrl = this.baseURL.startsWith('/') 
      ? `${this.baseURL}${endpoint}` 
      : `${this.baseURL}${endpoint}`;

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    const fullUrl = this.baseURL.startsWith('/') 
      ? `${this.baseURL}${endpoint}` 
      : `${this.baseURL}${endpoint}`;

    console.log("🚀 PUT URL:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const fullUrl = this.baseURL.startsWith('/') 
      ? `${this.baseURL}${endpoint}` 
      : `${this.baseURL}${endpoint}`;

    console.log("🚀 DELETE URL:", fullUrl);

    const response = await fetch(fullUrl, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    const fullUrl = this.baseURL.startsWith('/') 
      ? `${this.baseURL}${endpoint}` 
      : `${this.baseURL}${endpoint}`;

    console.log("🚀 PATCH URL:", fullUrl);
    
    const response = await fetch(fullUrl, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });

    return this.handleResponse<T>(response);
  }
}

export const apiService = new ApiService();