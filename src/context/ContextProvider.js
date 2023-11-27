import { createContext, useState } from "react";
export const MyContext = createContext();
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState(null);
  const value = {
    user,
    setUser,
    contacts,
    setContacts,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default ContextProvider;
