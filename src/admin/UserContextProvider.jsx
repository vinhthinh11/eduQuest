import { createContext, useContext, useState } from 'react';

const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const [update, setUpdate] = useState(false);
  return (
    <UserContext.Provider value={{ update, setUpdate }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
