import { createContext, useState, useContext } from "react";
import { MainContext } from "./MainProvider";

//import { toast } from "react-toastify";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const { notify } = useContext(MainContext);
  function defineUser(user, token) {
    setUser(user);
    setToken(token);
    window.localStorage.setItem("token", token);
    window.localStorage.setItem("userId", JSON.stringify(user.id));
    window.localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <UserContext.Provider
      value={{
        defineUser,
        notify,

        loading,

        setLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
