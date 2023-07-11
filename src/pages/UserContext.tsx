import { message } from 'antd';
import { isEmpty } from 'lodash';
import { createContext, useContext } from 'react';
import { useRouter } from 'next/router';
import AppContext from './api/AppContext';
import Login from './auth/login';

export const UserContext = createContext({} as any);

export const UserProvider = ({ children }) => {
  const router = useRouter();
  const context = useContext(AppContext);

  if (isEmpty(context.llenarForm)) {
    message.error('Debe iniciar sesion');
  }

  return (
    <UserContext.Provider key={1} value={{ }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
