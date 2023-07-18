import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  nombre: string;
  numdoc: string;
}

const initialState: UserState = {
  nombre: '',
  numdoc: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if (action.payload) {
        state.nombre = action.payload.nombre;
        state.numdoc = action.payload.numdoc;
      }
    },
    clearUser: (state) => {
      state.nombre = '';
      state.numdoc = '';
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
