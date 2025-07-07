// AttendanceDetailPage.tsx
import { Box, Button, Stack, Typography } from "@mui/material";
import AnnualInfo from "../../components/attendance/AnnualInfo";
import AttendanceDetail from "../../components/attendance/AttendanceDetail";
import { useParams, useNavigate } from "react-router-dom";
import { dummyUsers } from '../../components/attendance/AttendDummy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UserSummary from "../../components/attendance/UserSummary";


const AttendanceDetailPage = () => {
  const { id } = useParams();   // id값 없을 경우 0으로 인지하여 없는 값이 됨
  const userId = id ? parseInt(id, 10) : 0;
  const navigate = useNavigate();

  // 유저 이름 찾기
  const user = dummyUsers.find(u => u.id === userId);
  const userName = user?.name ?? "직원"; // 유저가 없을 경우 기본값


  return (
    // 전체 너비를 차지하는 래퍼
    <Box
      sx={{
        width: '100vw',
        maxWidth: '100%',
        minHeight: '100vh', // 필요 시 전체 높이 확보
        display: 'flex',
        justifyContent: 'center',
        py: 4,
        boxSizing: 'border-box', // 패딩 포함 너비 계산
      }}
    >
      {/* 실제 콘텐츠 영역 - 가운데 정렬됨 */}
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,  // 원하는 최대 콘텐츠 너비
          px: 2,           // 좌우 패딩
        }}
      >
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)}>
            Back
          </Button>
        </Stack>
        <Typography
          variant="h4"
          component="h2"
          fontWeight="bold"
          sx={{ mb: 4 }}
        > 
          <strong>{userName}</strong>님 근태 상세
        </Typography>               

        {/* 유저 간략한 주요 정보 */}
        <UserSummary userId={userId} />

        {/* 직원 근태 상세 */}
        <Box sx={{ mt: 3 }}>
          <AnnualInfo userId={userId} />
          <AttendanceDetail userId={userId} />
        </Box>

      </Box>
    </Box>
  );
}

export default AttendanceDetailPage;