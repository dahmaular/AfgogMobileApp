import {useTheme} from '@react-navigation/native';
import {CustomThemeType} from './modes';

export const useCustomTheme = (() =>
  useTheme()) as unknown as () => CustomThemeType;
