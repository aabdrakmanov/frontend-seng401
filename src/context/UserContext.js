import React from "react";
import { createContext, useState } from "react";
//stores all the user info for all the components to share
const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(true);
  const login = (userObject) => {
    console.log(userObject)
    localStorage.setItem('username',userObject.username)
    localStorage.setItem('company',userObject.company)
    console.log(localStorage.getItem('username'))
    
  };
  const logout = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('company')
  };
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
