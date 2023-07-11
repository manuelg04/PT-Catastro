/* eslint-disable arrow-body-style */
import { useContext } from 'react';
import { UserContext, UserProvider } from './UserContext';
import AppContext from './api/AppContext';

const useUsuario = () => {
  const context = useContext(AppContext);
  const context2 = useContext(UserContext);

  console.log(context2.rutaProtegida);

  return (
    <UserProvider value={{ rutaProtegida: context2.rutaProtegida }}/>
  );
};

export default useUsuario;
