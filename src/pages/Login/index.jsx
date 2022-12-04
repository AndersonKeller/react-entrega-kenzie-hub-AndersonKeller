import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { StyledForm } from "../../styles/StyledForm";
import { StyledButton } from "../../components/Button/styles";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "../../components/Input";

export function Login() {
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
    <>
      <Header isButton={false}></Header>
      <StyledForm onSubmit={handleSubmit(onSubmitApi)} noValidate>
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
      </StyledForm>
    </>
  );
}
