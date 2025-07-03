import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Approvals from '../pages/approval/ApprovalList';
import LoginPage from '../pages/auth/LoginPage';
import ApprovalAdmin from '../pages/approval/ApprovalAdmin';
import ApprovalDetail from '../pages/approval/ApprovalDetail';
import ApprovalRequest from '../pages/approval/ApprovalRequest';
import Header from '../components/Layout/Header';

const AppRouter = () => {

  const location = useLocation();
  const showHeader = location.pathname !== '/';
  return (
    <>
    {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/approvals" element={<Approvals />} />
        <Route path="/approvalAdmin" element={<ApprovalAdmin />} />
        <Route path="/approval/:id" element={<ApprovalDetail />} />
        <Route path="/approvalRequest" element={<ApprovalRequest />} />
      </Routes>
    </>
  );
};

export default AppRouter;