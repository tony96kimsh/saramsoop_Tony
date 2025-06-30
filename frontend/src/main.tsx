import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { EmployeeProvider } from './components/EmployeeProvider';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmployeeProvider>
      <App />
    </EmployeeProvider>
  </StrictMode>
);
