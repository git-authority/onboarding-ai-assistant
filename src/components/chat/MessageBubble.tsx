import React from 'react';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Message, useChat } from '@/contexts/ChatContext';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { setFeedback } = useChat();
  const isBot = message.sender === 'bot';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isBot ? 'row' : 'row-reverse',
        mb: 3,
        gap: 2,
        maxWidth: '100%',
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
          background: isBot
            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
            : 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
          boxShadow: isBot
            ? '0 4px 12px rgba(59, 130, 246, 0.25)'
            : '0 4px 12px rgba(249, 115, 22, 0.25)',
        }}
      >
        {isBot ? (
          <SmartToyOutlinedIcon sx={{ color: 'white' }} />
        ) : (
          <PersonOutlinedIcon sx={{ color: 'white' }} />
        )}
      </Box>

      {/* Message Content */}
      <Box sx={{ maxWidth: '75%', minWidth: 0 }}>
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            bgcolor: isBot ? 'background.paper' : 'primary.main',
            color: isBot ? 'text.primary' : 'primary.contrastText',
            borderRadius: 3,
            border: isBot ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
            boxShadow: isBot
              ? '0 2px 8px rgba(0, 0, 0, 0.2)'
              : '0 4px 12px rgba(59, 130, 246, 0.3)',
          }}
        >
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
            {message.content}
          </Typography>
        </Paper>

        {/* Timestamp and Feedback */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mt: 1,
            px: 0.5,
            justifyContent: isBot ? 'flex-start' : 'flex-end',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            {message.timestamp.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>

          {/* Feedback buttons for bot messages */}
          {isBot && message.id !== '1' && (
            <Box sx={{ display: 'flex', gap: 0.5, ml: 1 }}>
              <Tooltip title="Helpful">
                <IconButton
                  size="small"
                  onClick={() => setFeedback(message.id, 'positive')}
                  sx={{
                    color: message.feedback === 'positive' ? 'success.main' : 'text.secondary',
                    '&:hover': { color: 'success.main', bgcolor: 'rgba(16, 185, 129, 0.1)' },
                  }}
                >
                  {message.feedback === 'positive' ? (
                    <ThumbUpIcon fontSize="small" />
                  ) : (
                    <ThumbUpOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Not helpful">
                <IconButton
                  size="small"
                  onClick={() => setFeedback(message.id, 'negative')}
                  sx={{
                    color: message.feedback === 'negative' ? 'error.main' : 'text.secondary',
                    '&:hover': { color: 'error.main', bgcolor: 'rgba(239, 68, 68, 0.1)' },
                  }}
                >
                  {message.feedback === 'negative' ? (
                    <ThumbDownIcon fontSize="small" />
                  ) : (
                    <ThumbDownOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBubble;
