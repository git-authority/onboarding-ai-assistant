import React, { useRef, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useChat } from '@/contexts/ChatContext';
import MessageBubble from './MessageBubble';
import LoadingMessage from './LoadingMessage';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';

const ChatWindow: React.FC = () => {
  const { messages, isLoading, sendMessage, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Paper
      elevation={4}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        maxHeight: '80vh',
        width: '100%',
        maxWidth: 600,
        mx: 'auto',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          bgcolor: 'primary.main',
          color: 'white',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <SmartToyIcon />
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
              Onboarding Assistant
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.9 }}>
              Online • Ready to help
            </Typography>
          </Box>
        </Box>
        <Tooltip title="Start new chat">
          <IconButton
            onClick={clearChat}
            sx={{ color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}
          >
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          bgcolor: 'white',
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && <LoadingMessage />}
        <div ref={messagesEndRef} />
      </Box>

      {/* Quick Replies */}
      <Box sx={{ px: 2, bgcolor: 'white' }}>
        <QuickReplies onSelect={sendMessage} disabled={isLoading} />
      </Box>

      {/* Input */}
      <ChatInput onSend={sendMessage} disabled={isLoading} />
    </Paper>
  );
};

export default ChatWindow;
