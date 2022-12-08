import { useEffect } from "react";
import { useContext } from "react";
import { createContext, useState } from "react";
import { api } from "../services/api";
import { MainContext } from "./MainProvider";
import { UserContext } from "./UserContext";

export const TechContext = createContext({});

export function TechProvider({ children }) {
  const { user, setUser } = useContext(UserContext);
  const { notify } = useContext(MainContext);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  function deleteTech(id) {
    const token = window.localStorage.getItem("token");
    async function deleteApi() {
      try {
        await api.delete(`/users/techs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        notify("Excluido");
        getUser();
      } catch (error) {
        console.error(error);
        notify("Algo deu errado, não excluido", "error");
      }
    }
    deleteApi();
  }

  return loading ? null : (
    <TechContext.Provider
      value={{
        getUserModule,
        getUserName,
        getUserTechs,
        user,
        setUser,
        getUser,
        techs,
        deleteTech,
        setTechs,
      }}
    >
      {children}
    </TechContext.Provider>
  );
}
