export { Theme, ITheme } from './theme';
export { changeTheme } from './theme.actions';
import themeReducer, { getTheme, ThemeAction } from './theme.reducer';
export { getTheme, ThemeAction };
export default themeReducer;
