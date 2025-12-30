import React from 'react';
import { Box, Typography, IconButton, Tooltip, Avatar, Button } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LogoutIcon from '@mui/icons-material/Logout';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useChat } from '@/contexts/ChatContext';

const ChatHeader: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { clearChat } = useChat();

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Employee';

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 2,
        px: 3,
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        bgcolor: "background.paper",
      }}
    >
      {/* Left side - Bot info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
          }}
        >
          <SmartToyIcon sx={{ color: "white", fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={700} color="text.primary">
            Onboarding AI Assistant
          </Typography>
          <Typography
            variant="body2"
            color="success.main"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
              }}
            />
            Online • Ready to help
          </Typography>
        </Box>
      </Box>

      {/* Right side - User info and actions */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title="Start new chat">
          <IconButton
            onClick={clearChat}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                bgcolor: "rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Admin Portal">
          <IconButton
            onClick={() => navigate("/admin/login")}
            sx={{
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                bgcolor: "rgba(59, 130, 246, 0.1)",
              },
            }}
          >
            <AdminPanelSettingsOutlinedIcon />
          </IconButton>
        </Tooltip>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pl: 2,
            borderLeft: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: "primary.main",
              fontSize: "0.875rem",
            }}
          >
            {userName.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {userName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Employee
            </Typography>
          </Box>
          <Tooltip title="Sign out">
            <IconButton
              onClick={handleLogout}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "error.main",
                  bgcolor: "rgba(239, 68, 68, 0.1)",
                },
              }}
            >
              <LogoutIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatHeader;
