import { createContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const loginSchema = yup.object().shape({
    email: yup.string().required("email obrigatório").email("formato inválido"),
    password: yup.string().required("senha obrigatória"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(loginSchema),
  });
  function onSubmitApi(data) {
    async function loginApi() {
      try {
        setLoading(true);
        await api
          .post("/sessions", data)
          .then((response) =>
            defineUser(response.data.user, response.data.token)
          );
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        reset();

        return notify("Sucesso");
      } catch (error) {
        reset();
        return notify("Login inválido", "error");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
    loginApi();
  }

  return (
    <UserContext.Provider
      value={{ register, errors: errors, loading, handleSubmit, onSubmitApi }}
    >
      {children}
    </UserContext.Provider>
  );
}
