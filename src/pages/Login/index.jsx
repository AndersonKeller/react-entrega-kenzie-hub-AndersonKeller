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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Digite seu email"
          {...register("email")}
        />
        {errors.email?.message && <span>{errors.email.message}</span>}
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
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
