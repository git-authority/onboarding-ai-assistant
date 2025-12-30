import React from 'react';
import { Box, Paper, Skeleton } from '@mui/material';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';

const LoadingMessage: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        mb: 3,
        gap: 2,
      }}
    >
      {/* Avatar */}
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
        }}
      >
        <SmartToyOutlinedIcon sx={{ color: 'white' }} />
      </Box>

      {/* Loading Content */}
      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          bgcolor: 'background.paper',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.05)',
          maxWidth: '60%',
          minWidth: 250,
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Skeleton
            animation="wave"
            height={14}
            width="95%"
            sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.1)' }}
          />
          <Skeleton
            animation="wave"
            height={14}
            width="80%"
            sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.1)' }}
          />
          <Skeleton
            animation="wave"
            height={14}
            width="65%"
            sx={{ borderRadius: 1, bgcolor: 'rgba(255,255,255,0.1)' }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default LoadingMessage;
