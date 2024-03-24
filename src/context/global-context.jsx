import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    const tokenInfo = JSON.parse(localStorage.getItem("token"));
    setToken(tokenInfo);

    if (!tokenInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <GlobalContext.Provider value={{ token }}>
      <>{children}</>
    </GlobalContext.Provider>
  );
};

export const GlobalState = () => {
  return useContext(GlobalContext);
};

export default GlobalProvider;