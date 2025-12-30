import React from 'react';
import { Box, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import StatsCard from '@/components/admin/StatsCard';

const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Conversations',
      value: '2,847',
      change: 12,
      icon: <ChatBubbleOutlineIcon />,
      color: 'primary' as const,
    },
    {
      title: 'Active Users',
      value: '156',
      change: 8,
      icon: <PeopleOutlinedIcon />,
      color: 'secondary' as const,
    },
    {
      title: 'Satisfaction Rate',
      value: '94%',
      change: 3,
      icon: <ThumbUpOutlinedIcon />,
      color: 'success' as const,
    },
    {
      title: 'Documents',
      value: '38',
      change: -2,
      icon: <DescriptionOutlinedIcon />,
      color: 'warning' as const,
    },
  ];

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
          Overview of your AI onboarding chatbot performance
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 3
        }}
      >
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
