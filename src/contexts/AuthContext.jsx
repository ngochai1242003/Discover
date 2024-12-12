import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }); // null nếu chưa đăng nhập

  const hasRole = (role) => user?.role === role;
  // console.log('««««« role »»»»»', role);

  return (
    <AuthContext.Provider value={{ user, setUser, hasRole  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
