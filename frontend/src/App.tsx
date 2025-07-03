import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminEmployeePage from './pages/employee/AdminEmployeeManagement';
import TeamEmployeePage from './pages/employee/TeamEmployeeManagement';
import MyEmployeePage from './pages/employee/MyEmployeeManagement';
import EmployeeDetailPage from './pages/employee/EmployeeDetailPage';
import EmployeeCreatePage from './pages/employee/EmployeeCreatePage';
import Header from './components/Layout/Header'
import LoginPage from './pages/LoginPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminEmployee" element={<AdminEmployeePage />} />
        <Route path="/teamEmployee" element={<TeamEmployeePage />} />
        <Route path="/myEmployee" element={<MyEmployeePage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="/employees/create" element={<EmployeeCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
