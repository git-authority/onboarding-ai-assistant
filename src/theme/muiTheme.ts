import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#0f172a',
    },
    secondary: {
      main: '#f97316',
      light: '#fb923c',
      dark: '#ea580c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0f1419',
      paper: '#1a1f2e',
    },
    text: {
      primary: '#f1f5f9',
      secondary: '#94a3b8',
    },
    success: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    error: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.3)',
    '0px 4px 8px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px rgba(0, 0, 0, 0.3)',
    '0px 12px 24px rgba(0, 0, 0, 0.3)',
    '0px 16px 32px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
    '0px 20px 40px rgba(0, 0, 0, 0.3)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '10px 20px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(59, 130, 246, 0.3)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(59, 130, 246, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: 'none',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: 'rgba(255, 255, 255, 0.03)',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#3b82f6',
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
  },
});
