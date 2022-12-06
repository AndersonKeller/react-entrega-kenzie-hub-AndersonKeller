import { Button } from "../../components/Button";
import { Header } from "../../components/Header";

import { Form } from "../../components/Form";
import { StyledButton } from "../../components/Button/styles";

import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export function Login() {
  const { register, handleSubmit, errors, loading, onSubmitApi } =
    useContext(UserContext);

  return (
    <>
      <Header isButton={false}></Header>
      <Form onSubmit={handleSubmit(onSubmitApi)} noValidate>
        <h2>Login</h2>

        <Input
          label={"Email"}
          id={"email"}
          placeholder={"Digite seu email"}
          type={"email"}
          register={register("email")}
          errorMsg={errors.email?.message && errors.email.message}
        />
        <Input
          id={"password"}
          type={"password"}
          label={"Senha"}
          placeholder={"Digite sua senha"}
          register={register("password")}
          errorMsg={errors.password?.message && errors.password.message}
        />

        {!loading ? (
          <Button
            loading={loading}
            type={"submit"}
            color={"default"}
            text={"Entrar"}
          ></Button>
        ) : (
          <StyledButton
            type={"submit"}
            color={"default"}
            text={"Entrar"}
            loading={loading}
          >
            Entrar
          </StyledButton>
        )}
        <p>Ainda não possui uma conta?</p>
        <Link to={"/register"} color={"goRegister"}>
          Cadastre-se
        </Link>
      </Form>
    </>
  );
}
