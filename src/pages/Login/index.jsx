import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { StyledForm } from "../../styles/StyledForm";

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
      </StyledForm>
    </>
  );
}
