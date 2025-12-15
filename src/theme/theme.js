import { createMuiTheme } from '@material-ui/core/styles';

// Modern color palette - inspired by tech/coding aesthetic
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FF6B35', // Vibrant orange (Hacker News inspired)
      light: '#FF8C61',
      dark: '#E55A2B',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1A1A2E', // Deep dark blue/navy
      light: '#2D2D44',
      dark: '#0F0F1A',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F5F5F5', // Light gray background
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1A1A2E',
      secondary: '#6C757D',
    },
    error: {
      main: '#FF4444',
    },
    warning: {
      main: '#FFA726',
    },
    info: {
      main: '#42A5F5',
    },
    success: {
      main: '#66BB6A',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.5px',
    },
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '0.95rem',
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 8,
        padding: '8px 16px',
      },
      contained: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
        },
      },
    },
    MuiSelect: {
      root: {
        borderRadius: 8,
      },
    },
    MuiCard: {
      root: {
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        },
      },
    },
  },
});

export default theme;

