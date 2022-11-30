import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { StyledForm } from "../../styles/StyledForm";
export function Register() {
  return (
    <>
      <Header isButton={true}></Header>
      <StyledForm>
        <h2>Crie sua conta</h2>
        <p>Rapido e grátis, vamos nessa</p>
        <label htmlFor="">Nome</label>
        <input placeholder="Digite aqui seu nome" />
        <label htmlFor="">Email</label>
        <input placeholder="Digite aqui seu email" />
        <label htmlFor="">Senha</label>
        <input type="password" placeholder="Digite aqui sua senha" />
        <label htmlFor="">Confirmar senha</label>
        <input type="password" placeholder="Confirme sua senha" />
        <label htmlFor="">Bio</label>
        <input placeholder="Fale sobre você" />
        <label htmlFor="">Contato</label>
        <input placeholder="Opção de contato" />
        <label htmlFor="modulo">Selecionar módulo</label>
        <select name="modulo" id="modulo">
          <option value="Primeiro módulo">Primeiro módulo</option>
          <option value="Segundo módulo">Segundo módulo</option>
          <option value="Terceiro módulo">Terceiro módulo</option>
        </select>
        <Button type={"submit"} color={"default"} text={"Cadastrar"}></Button>
      </StyledForm>
    </>
  );
}
