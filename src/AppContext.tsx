import React, { createContext, useState } from 'react';

const AppContext = createContext({

  imageFile: undefined as File | undefined,
  setImageFile: (value: File | undefined) => {},
});

export const AppContextProvider = ({ children }:any) => {
  const [imageFile, setImageFile] = useState<File | undefined>();

  return (
    <AppContext.Provider value={{imageFile, setImageFile }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
