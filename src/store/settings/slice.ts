import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '..';
type initialState = {
  theme: 'dark' | 'light';
};

const initState: initialState = {
  theme: 'light',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initState,
  reducers: {
    switchMode: state => {
      if (state.theme === 'light') {
        state.theme = 'dark';
        return;
      }
      state.theme = 'light';
    },
  },
});

export const {switchMode} = settingsSlice.actions;
export const selectTheme = (state: RootState) => state.settings.theme;

export default settingsSlice.reducer;
