import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { StyledForm } from "../../styles/StyledForm";
import { StyledButton } from "../../components/Button/styles";
import { Navigate } from "react-router-dom";

export function Login() {
  return (
    <>
      <Header isButton={false}></Header>
      <StyledForm>
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" placeholder="Digite seu email" />
        <label htmlFor="password">Senha</label>
        <input id="password" type="password" placeholder="Digite sua senha" />
        <Button type={"submit"} color={"default"} text={"Entrar"}></Button>
        <p>Ainda não possui uma conta?</p>
        <StyledButton type={"button"} color={"goRegister"} text={"Cadastre-se"}>
          Cadastre-se
        </StyledButton>
      </StyledForm>
    </>
  );
}
