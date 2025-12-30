import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo credentials
    if (email === 'admin@company.com' && password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid email or password. Try admin@company.com / admin123');
    }
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
        background: "linear-gradient(180deg, #0f1419 0%, #0a0d12 100%)",
      }}
    >
      <Card
        elevation={0}
        sx={{
          maxWidth: 440,
          width: "100%",
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid rgba(255, 255, 255, 0.05)",
          bgcolor: "background.paper",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a1f2e 0%, #0f1419 100%)",
            color: "white",
            p: 4,
            textAlign: "center",
            borderBottom: "1px solid rgba(59, 130, 246, 0.3)",
          }}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              boxShadow: "0 8px 24px rgba(59, 130, 246, 0.4)",
              mx: "auto",
              mb: 2,
            }}
          >
            <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />
          </Box>
          <Typography variant="h5" fontWeight={700}>
            Admin Portal
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, mt: 1 }}>
            Onboarding AI Assistant
          </Typography>
        </Box>

        <CardContent sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2.5 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon sx={{ color: "text.secondary" }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: "text.secondary" }}
                    >
                      {showPassword ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <Box
            sx={{
              mt: 3,
              p: 2,
              bgcolor: "rgba(59, 130, 246, 0.1)",
              borderRadius: 2,
              textAlign: "center",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            <Typography variant="caption" color="primary.main">
              Demo credentials: admin@company.com / admin123
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="text"
            onClick={() => navigate("/auth")}
            sx={{ mt: 2, color: "text.secondary" }}
          >
            ← Back to Employee Portal
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminLogin;
