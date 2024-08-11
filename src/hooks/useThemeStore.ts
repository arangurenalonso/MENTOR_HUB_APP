import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../store/store';
import { themeEnum, ThemeMode } from '../store/theme/theme.initial-state';
import { setTheme, toggleTheme } from '../store/theme/theme.slice';
import LocalStorageEnum from '../common/enum/localstorage.enum';

const useThemeStore = () => {
  const dispatch: AppDispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);

  // Cargar el tema desde localStorage al inicializar el hook
  useEffect(() => {
    const storedTheme = localStorage.getItem(
      LocalStorageEnum.THEME_MODE
    ) as ThemeMode | null;
    if (storedTheme) {
      dispatch(setTheme(storedTheme));
    }
  }, []);

  useEffect(() => {
    const newTheme =
      mode === themeEnum.LIGHT ? themeEnum.LIGHT : themeEnum.DARK;

    localStorage.setItem(LocalStorageEnum.THEME_MODE, newTheme);
  }, [mode]);

  const changeTheme = (themeMode: ThemeMode) => {
    dispatch(setTheme(themeMode));
  };

  const switchTheme = () => {
    dispatch(toggleTheme());
  };

  return {
    //* Properties
    mode,
    //* Methods
    changeTheme,
    switchTheme,
  };
};

export default useThemeStore;
