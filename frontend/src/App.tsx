import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Layout/Header';
import LoginPage from './pages/LoginPage';
import AttendancePage from './pages/attendance/AttendancePage'; // 경로 확인 필요
import AttendanceDetailPage from './pages/attendance/AttendanceDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attend" element={<AttendancePage />} />
        <Route path="/attend/:id" element={<AttendanceDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;