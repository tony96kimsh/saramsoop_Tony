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
    this.baseURL = import.meta.env.VITE_API_URL || '/api';
     console.log('🔗 프록시 Proxy:', this.baseURL.startsWith('/'));
  }

  private getAuthHeaders(): HeadersInit {
    let token = localStorage.getItem('token');
    

    //토큰 없을 때 개발용 임시 토큰 생성
    if (!token && import.meta.env.NODE_ENV === 'development') {
      // token = import.meta.env.VITE_DEV_TOKEN;
       token = this.generateDevToken();
      //토큰 둘 중 하나 써도 됨
      if (token != null) localStorage.setItem('token', token);
      console.log('🔧 개발용 임시 토큰 생성:', token);
    }

    console.log(`토큰 >>>> ${token}`);

    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

// 개발용 임시 토큰 생성 함수
  private generateDevToken(): string {
    // JWT 형태의 개발용 토큰 생성 (실제로는 서명되지 않음)
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
      sub: 'dev-user',
      name: '테스트',
      role: 'Admin',
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 24시간 후 만료
      iat: Math.floor(Date.now() / 1000)
    }));
    const signature = btoa('dev-signature');
    
    return `${header}.${payload}.${signature}`;
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