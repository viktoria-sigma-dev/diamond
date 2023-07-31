import { createTheme } from '@mui/material';

export const APP_THEME = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,
  },
  palette: {
    mode: 'light',
    primary: {
      main: '#424242',
      contrastText: '#FAFAFA',
    },
    secondary: {
      main: '#FAFAFA',
      contrastText: '#424242',
    },
    warning: {
      main: '#D84315',
      contrastText: '#FBE9E7',
    },
    common: {
      black: '#081111',
      white: '#FFFFFF',
    },
    background: {
      default: 'rgba(255, 255, 255, 0.95)',
    },
  },
});
