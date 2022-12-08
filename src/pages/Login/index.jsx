import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { api } from "../../services/api";
import { Form } from "../../components/Form";
import { StyledButton } from "../../components/Button/styles";

import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export function Login() {
  const navigate = useNavigate();
  const {
    notify,
    token,
    defineUser,
    setToken,
    loading,
    user,
    setUser,
    setLoading,
  } = useContext(UserContext);
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
        const resp = await api
          .post("/sessions", data)
          .then((response) =>
            defineUser(response.data.user, response.data.token)
          );
        console.log(await token);
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
