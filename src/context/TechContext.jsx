import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";
import { api } from "../services/api";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

export function TechProvider({ children }) {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  function getUser() {
    async function getApiUser() {
      try {
        const res = await api.get("/profile", {
          headers: {
            authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
        return res.data;
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getApiUser();
  }

  useEffect(() => {
    getUser();
  }, []);
  function getUserTechs() {
    const userTechs = user?.techs;
    userTechs && setTechs([...userTechs]);
    return userTechs;
  }
  const [techs, setTechs] = useState([]);
  function getUserName() {
    const userName = user?.name;
    return userName;
  }
  function getUserModule() {
    const userModule = user.course_module;

    return userModule;
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
  return loading ? null : (
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
