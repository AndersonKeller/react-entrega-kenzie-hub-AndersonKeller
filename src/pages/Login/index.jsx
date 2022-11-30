import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { StyledForm } from "../../styles/StyledForm";
import { StyledButton } from "../../components/Button/styles";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

export function Login() {
  const [user, setUser] = useState("");
  const loginSchema = yup.object().shape({
    email: yup.string().required("email obrigatório").email("formato inválido"),
    password: yup.string().required("senha obrigatória"),
  });
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });
  async function onSubmitApi(data) {
    console.log(data);
    async function loginApi() {
      try {
        const resp = await api
          .post("/sessions", data)
          .then((response) => setUser(response.data.user));
        return resp;
      } catch (error) {
        console.log(error);
      }
    }
    loginApi();
  }
  console.log(user);

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
        <StyledButton type={"button"} color={"goRegister"} text={"Cadastre-se"}>
          Cadastre-se
        </StyledButton>
      </StyledForm>
    </>
  );
}
