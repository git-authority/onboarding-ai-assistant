import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
} from '@mui/material';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SmartToyIcon from '@mui/icons-material/SmartToy';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardOutlinedIcon />, path: '/admin' },
  { text: 'Documents', icon: <DescriptionOutlinedIcon />, path: '/admin/documents' },
  { text: 'Analytics', icon: <AnalyticsOutlinedIcon />, path: '/admin/analytics' },
];

const AdminSidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/admin/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "background.paper",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        },
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 60,
            height: 58,
            borderRadius: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
          }}
        >
          <AdminPanelSettingsIcon sx={{ fontSize: 36 }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={700} color="text.primary">
            Onboarding AI Assistant
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Admin Panel
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />

      {/* Navigation */}
      <List sx={{ px: 2, py: 3, flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                "&.Mui-selected": {
                  bgcolor: "rgba(59, 130, 246, 0.15)",
                  "&:hover": {
                    bgcolor: "rgba(59, 130, 246, 0.2)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                  "& .MuiListItemText-primary": {
                    color: "primary.main",
                    fontWeight: 600,
                  },
                },
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.05)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "text.secondary", minWidth: 44 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.05)" }} />

      {/* User Info */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            p: 2,
            bgcolor: "rgba(255, 255, 255, 0.03)",
            borderRadius: 2,
            mb: 2,
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
            A
          </Avatar>
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Typography
              variant="body2"
              fontWeight={600}
              noWrap
              color="text.primary"
            >
              Admin User
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              admin@company.com
            </Typography>
          </Box>
        </Box>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            "&:hover": {
              bgcolor: "rgba(239, 68, 68, 0.1)",
              "& .MuiListItemIcon-root": {
                color: "error.main",
              },
              "& .MuiListItemText-primary": {
                color: "error.main",
              },
            },
          }}
        >
          <ListItemIcon sx={{ color: "text.secondary", minWidth: 44 }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
