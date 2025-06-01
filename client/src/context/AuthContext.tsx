import { createContext, useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { getUserDetailsWithToken } = useAuth();

  useEffect(() => {
    console.log("In UseEffect of AuthContext");
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserDetailsWithToken(token);
        if (userDetails) {
          setUser(userDetails);
        }
      } catch (error) {
        setUser(null);
      }
    };

    if (token) {
      console.log("Fetching user details");
      fetchUserDetails();
    }
  }, [token]);

  const logoutUser = () => {
    localStorage.removeItem("token");
  };

  const loginUser = (userToken) => {
    setToken(userToken);
  };

  return (
    <AuthContext.Provider value={{ loginUser, logoutUser, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
