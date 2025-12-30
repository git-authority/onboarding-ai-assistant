import React, { createContext, useContext, useState, ReactNode } from 'react';
import { chatApi } from '@/services/api';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  feedback?: 'positive' | 'negative' | null;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  setFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! 👋 I'm your AI onboarding assistant. I'm here to help you get started at your new job. Feel free to ask me anything about company policies, benefits, IT setup, or general questions!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Call the real AI agent API
      const response = await chatApi.sendMessage(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response || 'I apologize, but I could not generate a response at this time.',
        sender: 'bot',
        timestamp: new Date(),
        feedback: null,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      
      // Fallback message on error
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize, but I\'m having trouble connecting to our system right now. Please try again in a moment, or contact IT support if the problem persists.',
        sender: 'bot',
        timestamp: new Date(),
        feedback: null,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const setFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        content: "Hello! 👋 I'm your AI onboarding assistant. I'm here to help you get started at your new job. Feel free to ask me anything!",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendMessage,
        setFeedback,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
