import { RootState } from './store';

export const selectUser = (state: RootState) => state.user;

export const selectUserName = (state: RootState) => state.user.nombre;

export const selectUserNumdoc = (state: RootState) => state.user.numdoc;


export const a = '';