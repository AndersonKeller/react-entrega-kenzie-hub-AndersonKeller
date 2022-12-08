import { createContext } from "react";
import { TechProvider } from "./TechContext";
import { UserProvider } from "./UserContext";
import { toast } from "react-toastify";

export const MainContext = createContext({});

export function MainProvider({ children }) {
  function notify(message, type) {
    type === "error" ? toast.error(message) : toast.success(message);
  }
  return (
    <MainContext.Provider value={{ notify }}>
      <UserProvider>
        <TechProvider>{children}</TechProvider>
      </UserProvider>
    </MainContext.Provider>
  );
}
