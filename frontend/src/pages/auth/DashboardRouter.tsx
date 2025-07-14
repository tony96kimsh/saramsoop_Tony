import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  LinearProgress,
  Button,
  IconButton,
} from '@mui/material';
import {
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Notifications as NotificationIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  Work as WorkIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { TokenManager } from '../../utils/tokenUtils';
import { useNavigate } from 'react-router-dom';

const DashboardRouter = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [loginTime] = useState(new Date());
  const [workingHours, setWorkingHours] = useState('0시간 0분');

   const navigate = useNavigate();

  // 현재 시간 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 근무 시간 계산
  useEffect(() => {
    const calculateWorkingHours = () => {
      const diff = currentTime.getTime() - loginTime.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setWorkingHours(`${hours}시간 ${minutes}분`);
    };

    calculateWorkingHours();
  }, [currentTime, loginTime]);

  // 사용자 정보 가져오기
  const user = TokenManager.getUser() || {
    name: '직원',
    role: 'Employee',
    empNo: 'EMP001',
    email: 'employee@company.com',
    department: '개발팀',
    position: '사원'
  };

  // 임시 데이터
  const notifications = [
    { id: 1, type: 'info', message: '월간 회의가 오늘 오후 2시에 예정되어 있습니다.', time: '10분 전' },
    { id: 2, type: 'warning', message: '휴가 신청서 마감이 내일까지입니다.', time: '1시간 전' },
    { id: 3, type: 'success', message: '지난달 성과 평가가 완료되었습니다.', time: '3시간 전' },
  ];

  const recentTasks = [
    { id: 1, title: '프로젝트 A 진행 상황 보고', status: 'completed', dueDate: '2024-01-15' },
    { id: 2, title: '월간 회의 자료 준비', status: 'pending', dueDate: '2024-01-16' },
    { id: 3, title: '시스템 점검 보고서 작성', status: 'in-progress', dueDate: '2024-01-18' },
  ];

  const upcomingSchedule = [
    { id: 1, title: '팀 미팅', time: '14:00', type: 'meeting' },
    { id: 2, title: '프로젝트 리뷰', time: '16:30', type: 'review' },
    { id: 3, title: '월간 보고', time: '내일 09:00', type: 'report' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon color="success" />;
      case 'pending':
        return <PendingIcon color="warning" />;
      case 'in-progress':
        return <TrendingUpIcon color="info" />;
      default:
        return <AssignmentIcon />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'in-progress':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f7fa', minHeight: '100vh' }}>
      {/* 헤더 영역 */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="#2c3e50">
          안녕하세요, {user.name}님! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          오늘도 좋은 하루 되세요. 현재 시간: {currentTime.toLocaleString('ko-KR')}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* 첫 번째 행 - 4개 카드 */}
        {/* 사용자 정보 카드 */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, height: 350 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#3498db',
                  fontSize: '1.2rem',
                  mr: 2
                }}
              >
                {user.name.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.empNo} | {user.position || '사원'}
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WorkIcon sx={{ mr: 1, color: '#34495e', fontSize: 20 }} />
                <Typography variant="body2">
                  부서: {user.department || '개발팀'}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ mr: 1, color: '#34495e', fontSize: 20 }} />
                <Typography variant="body2">
                  역할: <Chip label={user.role} size="small" color="primary" />
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TimeIcon sx={{ mr: 1, color: '#34495e', fontSize: 20 }} />
                <Typography variant="body2">
                  로그인: {loginTime.toLocaleTimeString('ko-KR')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ mr: 1, color: '#34495e', fontSize: 20 }} />
                <Typography variant="body2">
                  근무시간: {workingHours}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* 오늘의 할일 */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, height: 350 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                오늘의 할일
              </Typography>
              <IconButton size="small">
                <RefreshIcon />
              </IconButton>
            </Box>

            <List dense sx={{ maxHeight: 220, overflow: 'auto' }}>
              {recentTasks.map((task) => (
                <ListItem key={task.id} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    {getStatusIcon(task.status)}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.875rem' }}>
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                        <Chip
                          label={
                            task.status === 'completed' ? '완료' :
                            task.status === 'pending' ? '대기' : '진행중'
                          }
                          size="small"
                          color={getStatusColor(task.status) as any}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {task.dueDate}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
              startIcon={<AssignmentIcon />}
            >
              모든 할일 보기
            </Button>
          </Paper>
        </Grid>

        {/* 오늘의 일정 */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              오늘의 일정
            </Typography>

            <List dense sx={{ maxHeight: 220, overflow: 'auto' }}>
              {upcomingSchedule.map((schedule) => (
                <ListItem key={schedule.id} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 35 }}>
                    <CalendarIcon color="primary" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight="medium" sx={{ fontSize: '0.875rem' }}>
                        {schedule.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {schedule.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>

            <Button
              fullWidth
              variant="outlined"
              size="small"
              sx={{ mt: 1 }}
              startIcon={<CalendarIcon />}
            >
              전체 일정 보기
            </Button>
          </Paper>
        </Grid>

        {/* 빠른 액션 */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={2} sx={{ p: 3, height: 350 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              빠른 액션
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  startIcon={<AssignmentIcon />}
                  onClick={()=>navigate('/approval/request')}
                  sx={{ py: 1.5, fontSize: '0.8rem' }}
                >
                  결재 신청
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  startIcon={<CalendarIcon />}
                  sx={{ py: 1.5, fontSize: '0.8rem' }}
                >
                  휴가 신청
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<ScheduleIcon />}
                  sx={{ py: 1.5, fontSize: '0.8rem' }}
                >
                  근태 확인
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<PersonIcon />}
                  sx={{ py: 1.5, fontSize: '0.8rem' }}
                >
                  내 정보
                </Button>
              </Grid>
            </Grid>

            {/* 이번 달 현황을 빠른 액션 아래로 이동 */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
                📊 이번 달 나의 현황
              </Typography>
              
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="h5" color="primary" fontWeight="bold">
                        12
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        완료된 업무
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="h5" color="warning.main" fontWeight="bold">
                        3
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        진행중인 업무
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="h5" color="success.main" fontWeight="bold">
                        95%
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        출근율
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card variant="outlined" sx={{ textAlign: 'center' }}>
                    <CardContent sx={{ py: 1.5 }}>
                      <Typography variant="h5" color="info.main" fontWeight="bold">
                        8.5
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        평균 근무시간
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* 두 번째 행 - 알림 */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              📢 최근 알림
            </Typography>

            <Grid container spacing={2}>
              {notifications.map((notification) => (
                <Grid item xs={12} md={4} key={notification.id}>
                  <Alert
                    severity={notification.type as any}
                    icon={<NotificationIcon />}
                    sx={{ height: '100%' }}
                  >
                    <Box>
                      <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {notification.time}
                      </Typography>
                    </Box>
                  </Alert>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Button variant="text" size="small">
                모든 알림 보기
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardRouter;