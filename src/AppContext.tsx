import React, { createContext, useState } from 'react';

const AppContext = createContext({
    userToken: null as string | null,  
  setUserToken: (value: string | null) => {}, 
});

export const AppContextProvider = ({ children }:any) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
