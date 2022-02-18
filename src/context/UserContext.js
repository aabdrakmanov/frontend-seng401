import React from "react";
import { createContext, useState } from "react";
//stores all the user info for all the components to share
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = () => {
    //makes some call to the api to validate login, if login valid set user , else keep user as null
  };
  const logout = () => {
    setUser(null);
  };
  return (
    <UserContext.Provider
      value={{
        user,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
