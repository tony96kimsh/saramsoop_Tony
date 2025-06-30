import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminEmployeePage from './pages/AdminEmployeeManagement';
import TeamEmployeePage from './pages/TeamEmployeeManagement';
import MyEmployeePage from './pages/MyEmployeeManagement';
import EmployeeDetailPage from './pages/EmployeeDetailPage';
import EmployeeCreatePage from './pages/EmployeeCreatePage';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminEmployee" element={<AdminEmployeePage />} />
        <Route path="/teamEmployee" element={<TeamEmployeePage />} />
        <Route path="/myEmployee" element={<MyEmployeePage />} />
        <Route path="/employees/:id" element={<EmployeeDetailPage />} />
        <Route path="/employees/create" element={<EmployeeCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
