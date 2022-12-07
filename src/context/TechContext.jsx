import { createContext, useState } from "react";
import { api } from "../services/api";

export const TechContext = createContext({});

export function TechProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [techs, setTechs] = useState([]);
  function getUserName() {
    const user = JSON.parse(window.localStorage.getItem("user"));
    return user && user.name;
  }
  function getUserModule() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return user && user.course_module;
  }
  function getUserTechs() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return user && setTechs(user.techs);
  }
  function userUpdate() {
    const idUser = JSON.parse(window.localStorage.getItem("userId"));
    async function getUpdateUser() {
      await api
        .get(`/users/${idUser}`)
        .then((response) =>
          window.localStorage.setItem("user", JSON.stringify(response.data))
        );
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    getUpdateUser();
  }
  return (
    <TechContext.Provider
      value={{
        getUserModule,
        getUserName,
        getUserTechs,
        user,
        setUser,
        userUpdate,
        techs,
        setTechs,
      }}
    >
      {children}
    </TechContext.Provider>
  );
}
