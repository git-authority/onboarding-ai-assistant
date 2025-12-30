import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import { useChat } from '@/contexts/ChatContext';
import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';
import LoadingMessage from './LoadingMessage';
import QuickReplies from './QuickReplies';
import ChatInput from './ChatInput';

const FullPageChat: React.FC = () => {
  const { messages, isLoading, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <ChatHeader />

      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ maxWidth: 900, width: '100%', mx: 'auto', flex: 1 }}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          {isLoading && <LoadingMessage />}
          <div ref={messagesEndRef} />
        </Box>
      </Box>

      {/* Quick Replies */}
      <Box sx={{ maxWidth: 900, width: '100%', mx: 'auto' }}>
        <QuickReplies onSelect={sendMessage} disabled={isLoading} />
      </Box>

      {/* Input */}
      <Box sx={{ maxWidth: 900, width: '100%', mx: 'auto' }}>
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </Box>
    </Box>
  );
};

export default FullPageChat;
