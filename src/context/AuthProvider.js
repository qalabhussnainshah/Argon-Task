import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [comments, setComments] = useState([]);

  return (
    <AuthContext.Provider value={{ auth, comments, setComments, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
