import { Route, Routes } from 'react-router-dom';
import EmployeePageRouter from '../pages/employee/EmployeePageRouter';
import EmployeeCreatePage from '../pages/employee/EmployeeCreatePage';
import EmployeeDetailPage from '../pages/employee/EmployeeDetailPage';

export default function EmployeeRoutes() {
  return (
    <Routes>
      <Route path="/employee" element={<EmployeePageRouter />} />
      <Route path="/employee/create" element={<EmployeeCreatePage />} />
      <Route path="/employee/:id" element={<EmployeeDetailPage />} />
    </Routes>
  );
}
