import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type  UserState = {
  nombre: string;
  numdoc: string;
  email: string;
  password: string;
  tipoprop: string;
  tipodoc: string;
  telefono: string;
  direccion: string;
}

const initialState: UserState = {
  nombre: '',
  numdoc: '',
  email: '',
  password: '',
  tipoprop: '',
  tipodoc: '',
  telefono: '',
  direccion: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      if (action.payload) {
        state.nombre = action.payload.nombre;
        state.numdoc = action.payload.numdoc;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.tipoprop = action.payload.tipoprop;
        state.tipodoc = action.payload.tipodoc;
        state.telefono = action.payload.telefono;
        state.direccion = action.payload.direccion;
        
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
