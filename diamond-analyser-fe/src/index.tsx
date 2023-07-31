import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material';
import './index.css';
import { store } from './store/modules/store';
import App from './App';
import { APP_THEME } from './constants/theme';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={APP_THEME}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
