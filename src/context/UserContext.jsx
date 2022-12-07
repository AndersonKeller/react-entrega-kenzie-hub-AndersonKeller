import { createContext, useState, useEffect } from "react";

import { toast } from "react-toastify";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  function notify(message, type) {
    type === "error" ? toast.error(message) : toast.success(message);
  }

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
