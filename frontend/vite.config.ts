// vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // 배포 환경에서 라우팅 문제 방지
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5277', // ✅ 로컬 백엔드 주소
        changeOrigin: true,
        secure: false,
      },
    },
  },
  envPrefix: 'VITE_',
});