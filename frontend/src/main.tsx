import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { EmployeeProvider } from './components/EmployeeProvider';
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { EmployeeProvider } from './components/employee/EmployeeProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </AuthProvider>
  </StrictMode>,
)
