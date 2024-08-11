import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import darkTheme from './darth.theme';
import lightTheme from './light.theme';
import useThemeStore from '../hooks/useThemeStore';
import { themeEnum } from '../store/theme/theme.initial-state';

interface AppThemeProps {
  children: React.ReactNode;
}

const AppTheme = ({ children }: AppThemeProps) => {
  const { mode } = useThemeStore();

  return (
    <ThemeProvider theme={mode === themeEnum.LIGHT ? lightTheme : darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
