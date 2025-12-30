import React, { useState, KeyboardEvent } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        px: 3,
        bgcolor: 'background.paper',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          alignItems: 'flex-end',
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 3,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          p: 1,
          transition: 'all 0.2s ease',
          '&:focus-within': {
            borderColor: 'primary.main',
            boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
          },
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              px: 1.5,
              py: 0.5,
            },
          }}
          sx={{
            '& .MuiInputBase-input': {
              color: 'text.primary',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 0.7,
              },
            },
          }}
        />
        <IconButton
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          sx={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            width: 44,
            height: 44,
            borderRadius: 2,
            '&:hover': {
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            },
            '&.Mui-disabled': {
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'text.secondary',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatInput;
