import React, { createContext, useState } from 'react';

const AppContext = createContext({
    userToken: null as string | null,  // Actualizado
  setUserToken: (value: string | null) => {}, // valor inicial
});

export const AppContextProvider = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
