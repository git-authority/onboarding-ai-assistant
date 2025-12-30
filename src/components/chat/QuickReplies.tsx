import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import PolicyOutlinedIcon from '@mui/icons-material/PolicyOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

interface QuickRepliesProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

const quickReplies = [
  {
    label: 'Getting Started',
    message: 'How do I get started with the onboarding process?',
    icon: <HelpOutlineIcon fontSize="small" />,
  },
  {
    label: 'Key Contacts',
    message: 'Who should I contact for help or questions?',
    icon: <PeopleOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Important Resources',
    message: 'What are the important resources I should know about?',
    icon: <ComputerOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Policies & Guidelines',
    message: 'Where can I find the policies and guidelines?',
    icon: <PolicyOutlinedIcon fontSize="small" />,
  },
  {
    label: 'Training & Learning',
    message: 'What training or learning materials are available?',
    icon: <EventOutlinedIcon fontSize="small" />,
  },
  {
    label: 'FAQs',
    message: 'What are the most frequently asked questions?',
    icon: <LocalHospitalOutlinedIcon fontSize="small" />,
  },
];

const QuickReplies: React.FC<QuickRepliesProps> = ({ onSelect, disabled }) => {
  return (
    <Box sx={{ py: 2, px: 3, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mb: 1.5, display: 'block', fontWeight: 500 }}
      >
        Quick Questions
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {quickReplies.map((reply) => (
          <Chip
            key={reply.label}
            icon={reply.icon}
            label={reply.label}
            onClick={() => onSelect(reply.message)}
            disabled={disabled}
            variant="outlined"
            sx={{
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'text.secondary',
              bgcolor: 'rgba(255, 255, 255, 0.02)',
              '& .MuiChip-icon': {
                color: 'text.secondary',
              },
              '&:hover': {
                bgcolor: 'primary.main',
                color: 'white',
                borderColor: 'primary.main',
                '& .MuiChip-icon': {
                  color: 'white',
                },
              },
              transition: 'all 0.2s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default QuickReplies;
