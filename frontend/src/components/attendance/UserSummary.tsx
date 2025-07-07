// UserSummary.tsx
import { Box, Paper, Typography, Divider } from "@mui/material";
import { dummyUsers } from './AttendDummy';

interface UserSummaryProps {
  userId: number;
}

const UserSummary = ({ userId }: UserSummaryProps) => {
  const user = dummyUsers.find((user) => user.id === userId);

  if (!user) return null;

  const infoItems = [
    { label: '이름', value: user.name },
    { label: '직원코드', value: user.emp_no },
    { label: '부서', value: user.department },
    { label: '직책', value: user.position },
  ];

  return (
    <>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
        직원 정보
      </Typography>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: '#fcfcfc',
          mb: 4,
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          {infoItems.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                flex: '1 1 25%',
                minWidth: 0,
              }}
            >
              <Typography variant="body2" color="textSecondary">
                {item.label}
              </Typography>
              <Typography variant="subtitle1" fontWeight="medium">
                {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default UserSummary;
