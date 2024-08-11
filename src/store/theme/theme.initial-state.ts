import LocalStorageEnum from '../../common/enum/localstorage.enum';

export type ThemeMode = themeEnum.LIGHT | themeEnum.DARK;

export type ThemeState = {
  mode: ThemeMode;
};
export enum themeEnum {
  LIGHT = 'light',
  DARK = 'dark',
}

export const initialThemeState: ThemeState = {
  mode:
    (localStorage.getItem(LocalStorageEnum.THEME_MODE) as ThemeMode) ||
    themeEnum.LIGHT,
};
