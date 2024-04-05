import { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material';

// de day co thoi gian ranh thi lam giao dien cho dark mode

export const tokens = mode => ({});

export const themeSetting = mode => {
  const colors = tokens(mode);

  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.secondary[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
          }
        : {
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: '#fcfcfc',
            },
          }),
    },
    typography: {
      fontFamily: ['Consolas, sans-serif'],
      fontSize: 12,
      h1: {
        fontFamily: ['Consolas, sans-serif'],
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Consolas, sans-serif'],
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Consolas, sans-serif'],
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Consolas, sans-serif'],
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Consolas, sans-serif'],
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Consolas, sans-serif'],
        fontSize: 14,
      },
    },
  };
};
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useMode = () => {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light')),
    }),
    []
  );
};
