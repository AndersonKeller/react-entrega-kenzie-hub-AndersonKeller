import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { StyledForm } from "../../styles/StyledForm";
import { StyledButton } from "../../components/Button/styles";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [user, setUser] = useState("");
  const [token, setToken] = useState("");
  const [page, setPage] = useState(false);
  const navigate = useNavigate();

  function notify(message) {
    return toast(message);
  }

  function defineUser(user, token) {
    setUser(user);
    setToken(token);
  }

  const loginSchema = yup.object().shape({
    email: yup.string().required("email obrigatório").email("formato inválido"),
    password: yup.string().required("senha obrigatória"),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  function onSubmitApi(data) {
    console.log(data);
    async function loginApi() {
      try {
        const resp = await api
          .post("/sessions", data)
          .then((response) =>
            defineUser(response.data.user, response.data.token)
          );
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        return notify("Deu");
      } catch (error) {
        return notify("Login inválido");
      } finally {
      }
    }
    loginApi();
  }
  // console.log(user);
  // console.log(token);
  useEffect(() => {
    if (page) {
      navigate("/register");
    }
  }, [page]);
  function onClickHeader() {
    setPage(false);
  }

  return (
    <>
      <Header isButton={false}></Header>
      <StyledForm onSubmit={handleSubmit(onSubmitApi)} noValidate>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
        />
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />
        <Button type={"submit"} color={"default"} text={"Entrar"}></Button>
        <p>Ainda não possui uma conta?</p>
        <StyledButton
          onClick={() => setPage(true)}
          type={"button"}
          color={"goRegister"}
          text={"Cadastre-se"}
        >
          Cadastre-se
        </StyledButton>
      </StyledForm>
    </>
  );
}
