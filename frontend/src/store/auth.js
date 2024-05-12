import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContex = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;

  const storeToken = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: authorizationToken,
        },
      };
      const response = await axios.get("/api/users/profile", config);

      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
        // storeToken(token); // Store the token obtained from the backend
        // setUser(user);
      } else {
        console.log("error in isLoading");
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error from fetching data");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContex.Provider
      value={{
        storeToken,
        LogoutUser,
        isLoggedIn,
        authorizationToken,
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContex.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContex);
};
