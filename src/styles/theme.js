import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9e9e9e',
      light: '#cfcfcf',
      dark: '#707070',
      contrastText: '#fff',
    },
    secondary: {
      main: '#424242',
      light: '#6d6d6d',
      dark: '#1b1b1b',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
    divider: 'rgba(255, 255, 255, 0.12)',
    custom: {
      gradients: {
        primary: 'linear-gradient(45deg, #2c2c2c 30%, #424242 90%)',
        secondary: 'linear-gradient(45deg, #1e1e1e 30%, #2c2c2c 90%)',
        dark: 'linear-gradient(45deg, #121212 30%, #1e1e1e 90%)',
      },
    },
  },
  typography: {
    fontFamily: '"Space Grotesk", "Inter", sans-serif',
    h1: {
      fontSize: '4rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'scale(1.02)',
            backgroundColor: '#2c2c2c',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #2c2c2c 30%, #424242 90%)',
          boxShadow: '0 3px 15px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-5px) rotate(1deg)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(30, 30, 30, 0.6)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        },
      },
    },
  },
});

export default theme; 