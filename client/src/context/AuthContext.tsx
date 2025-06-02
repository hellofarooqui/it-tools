import { createContext, useContext, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { getUserDetailsWithToken } = useAuth();

  useEffect(() => {
    //console.log("In UseEffect of AuthContext");
    const fetchUserDetails = async () => {
      if (token) {
        try {
          const userDetails = await getUserDetailsWithToken(token);
          if (userDetails) {
            console.log(userDetails);
            setUser(userDetails);
            setAuthLoading(false);
          }
        } catch (error) {
          setUser(null);
          setAuthLoading(false);
          setAuthError("Invalid Token");
          localStorage.removeItem("token")
        }
      }
      else {
        setAuthError(null)
        setUser(null)
        setAuthLoading(false)
      }
    };
    fetchUserDetails();
  }, [token]);

  const logoutUser = () => {
    localStorage.removeItem("token");
    setToken(null)
  };

  const loginUser = (userToken) => {
    setToken(userToken);
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        logoutUser,
        user,
        token,
        authError,
        authLoading,
        setToken,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
