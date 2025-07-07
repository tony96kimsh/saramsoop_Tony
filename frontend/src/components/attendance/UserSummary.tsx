// UserSummary.tsx
import { dummyUsers } from './AttendDummy';

interface UserSummaryProps {
  userId: number;
}

const UserSummary = ({ userId }: UserSummaryProps) => {
  const userSummary = dummyUsers.filter((user) => user.id === userId);
  return (
    <>
    <h3>직원 정보</h3>
    <p>이름: {userSummary[0].name }</p>
    <p>직원코드: {userSummary[0].emp_no }</p>
    <p>부서: {userSummary[0].department }</p>
    <p>직책: {userSummary[0].position }</p>
    </>
  )
}

export default UserSummary;