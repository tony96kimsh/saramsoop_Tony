import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
// import HomeIcon from '@mui/icons-material/Home';
// import PeopleIcon from '@mui/icons-material/People';
// import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import logo from '../assets/logo3.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  return (
    <AppBar position="fixed" elevation={2} sx={{ backgroundColor: '#447A5C' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        {/* 좌측: 로고 + 텍스트 */}
        <Box display="flex" alignItems="center" gap={1}>
          <Box
            component="img"
            src={logo}
            alt="logo"
            sx={{ width: 32, height: 32 }}
          />
          <Typography
            variant="h6"
            fontWeight="bold"
            color="#fff"
            sx={{ lineHeight: 1, mt: '2px' }} // 약간 위로 올림
          >
            사람숲
          </Typography>
        </Box>


        {/* 우측: 메뉴 */}
        <Box display="flex" alignItems="center" gap={3}>
          <Box display="flex" alignItems="center" gap={1}>
            {/* <HomeIcon sx={{ color: '#444', fontSize: 18 }} /> */}
            <Typography variant="body2" color="#fff">홈</Typography>
          </Box>
          <Box 
            display="flex"
            alignItems="center"
            gap={1}
            onClick={() => navigate('/adminEmployee')}
            sx={{ cursor: 'pointer' }}
          >
            {/* <PeopleIcon sx={{ color: '#444', fontSize: 18 }} /> */}
            <Typography variant="body2" color="#fff">직원관리</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            {/* <ScheduleIcon sx={{ color: '#444', fontSize: 18 }} /> */}
            <Typography variant="body2" color="#fff">근태관리</Typography>
          </Box>

          {/* 알림 */}
          <IconButton size="small">
            <NotificationsIcon sx={{ color: '#fff' }} />
          </IconButton>

          {/* 유저 프로필 드롭다운 */}
          <Box onClick={handleMenuClick} sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar sx={{ width: 24, height: 24, bgcolor: '#fff', color: '#444', fontSize: 14 }}>khs</Avatar>
            <ArrowDropDownIcon sx={{ color: '#fff' }} />
          </Box>
          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>내 정보</MenuItem>
            <MenuItem onClick={handleMenuClose}>로그아웃</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
