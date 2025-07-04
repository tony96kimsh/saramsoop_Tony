import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requiredRoles?: string[];
}
// context 에서 response.data => user => {userId, role, email, phone, department, position, status}
const ProtectedRoute = ({ children, requiredRoles }: ProtectedRouteProps) => {
 // const { user } = useAuth();
  //임시로 테스트용으로 넣음
  const user = {
     role:'Admin'
    // role:'Employee'
    //role:'Manager'
  }

  console.log("권한 체크 user.role>>>"+user.role);
  if (!user) return <Navigate to="/" replace />;
  if (requiredRoles && !requiredRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
