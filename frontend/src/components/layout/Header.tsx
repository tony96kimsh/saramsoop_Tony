import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Link } from 'react-router-dom';
import logo from '/logo2.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" elevation={2} sx={{ backgroundColor: '#447A5C' }}>
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64 }}>
        {/* 좌측: 로고 + 텍스트 + 메뉴 */}
        <Box display="flex" alignItems="center" gap={1} sx={{ pl: 2 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{ width: 32, height: 32, mr: 1 }}
            />
            <Typography
              variant="h6"
              fontWeight="bold"
              color="#fff"
              sx={{ lineHeight: 1, mt: '2px' }}
            >
              사람숲
            </Typography>
          </Link>

          {/* 메뉴 항목들 */}
          <Box display="flex" alignItems="center" gap={3} sx={{ ml: 4, mt: '5px' }}>
            <Link to="/employees" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="#fff">직원관리</Typography>
            </Link>
            <Link to="/attendance" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="#fff">근태관리</Typography>
            </Link>
            <Link to="/approvals" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="#fff">결재관리</Typography>
            </Link>
            <Link to="/payroll" style={{ textDecoration: 'none' }}>
              <Typography variant="body2" color="#fff">급여관리</Typography>
            </Link>
          </Box>
        </Box>
        


        {/* 우측: 알림 + 유저 드롭다운 */}
        <Box display="flex" alignItems="center" gap={3}>
          <IconButton size="small">
            <NotificationsIcon sx={{ color: '#fff' }} />
          </IconButton>

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
