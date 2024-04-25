import { createContext, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';

const UserContext = createContext();
export const UserContextProvider = ({ children }) => {
  const location = useLocation();
  // get current user type
  const userType = location.pathname.split('/').at(-2);
  const userPath = location.pathname.split('/').at(-1);
  const userLink = { userPath, userType };
  const [update, setUpdate] = useState(false);
  return (
    <UserContext.Provider value={{ update, setUpdate, userLink }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
