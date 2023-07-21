import { RootState } from './store';

export const selectUser = (state: RootState) => state.user;
export const selectUserName = (state: RootState) => state.user.nombre;
export const selectUserNumdoc = (state: RootState) => state.user.numdoc;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserPassword = (state: RootState) => state.user.password;
export const selectUserTipoprop = (state: RootState) => state.user.tipoprop;
export const selectUserTipodoc = (state: RootState) => state.user.tipodoc;
export const selectUserTelefono = (state: RootState) => state.user.telefono;
export const selectUserDireccion = (state: RootState) => state.user.direccion;
export const selectUserIdusuario = (state: RootState) => state.user.idusuario;
