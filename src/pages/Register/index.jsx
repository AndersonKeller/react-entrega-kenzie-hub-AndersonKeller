import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { StyledForm } from "../../styles/StyledForm";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { SelectModule } from "../../components/SelectModule";

export function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .required("Nome obrigatório")
      .min(4, "Nome deve conter no mínimo 4 caracteres"),
    email: yup.string().required("email obrigatório").email("formato inválido"),
    password: yup
      .string()
      .required("senha obrigatória")
      .min(8, "deve conter no mínimo 8 caracteres")
      .matches(/(?=.*?[A-Z])/, "Deve conter ao menos uma letra maiúscula")
      .matches(/(?=.*?[a-z])/, "Ao menos uma letra minúscula")
      .matches(/(?=.*?[0-9])/, "Deve conter ao menos um número")
      .matches(
        /(?=.*?[#?!@$%^&*-])/,
        "Deve conter ao menos um caracter especial"
      ),
    passwordValidate: yup
      .string()
      .oneOf([yup.ref("password", "deve ser igual")]),
    bio: yup.string().required("campo obrigatório").min(10),
    contact: yup.string().required("Campo obrigatório"),
    course_module: yup.string().required("Escolha um módulo"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(registerSchema),
  });
  function notify(message, type) {
    type === "error" ? toast.error(message) : toast.success(message);
  }

  function onSubmitApi(data) {
    async function registerApi() {
      try {
        setLoading(true);
        await api.post("/users", data).then((response) => {
          console.log(response);
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        return notify("Cadastro realizado com sucesso");
      } catch (error) {
        reset({ password: "", passwordValidate: "" });
        return notify(error.response.data.message, "error");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
    registerApi();
  }
  return (
    <>
      <Header isButton={true} text={"Voltar"}></Header>
      <StyledForm onSubmit={handleSubmit(onSubmitApi)} noValidate>
        <h2>Crie sua conta</h2>
        <p>Rapido e grátis, vamos nessa</p>
        <label htmlFor="">Nome</label>
        <input placeholder="Digite aqui seu nome" {...register("name")} />
        {errors.name?.message && <span>{errors.name.message}</span>}
        <label htmlFor="">Email</label>
        <input placeholder="Digite aqui seu email" {...register("email")} />
        {errors.email?.message && <span>{errors.email.message}</span>}
        <label htmlFor="">Criar senha</label>
        <input
          type="password"
          placeholder="Digite aqui sua senha"
          {...register("password")}
        />
        {errors.password?.message && <span>{errors.password.message}</span>}
        <label htmlFor="">Confirmar senha</label>
        <input
          type="password"
          placeholder="Confirme sua senha"
          {...register("passwordValidate")}
        />
        {errors.passwordValidate?.message && (
          <span>{"A senha não corresponde"}</span>
        )}
        <label htmlFor="">Bio</label>
        <input placeholder="Fale sobre você" {...register("bio")} />
        {errors.bio?.message && <span>{errors.bio.message}</span>}
        <label htmlFor="">Contato</label>
        <input placeholder="Opção de contato" {...register("contact")} />
        {errors.contact?.message && <span>{errors.contact.message}</span>}
        <label htmlFor="modulo">Selecionar módulo</label>

        <SelectModule
          errorMsg={
            errors.course_module?.message && errors.course_module.message
          }
          name={"modulo"}
          register={register("course_module")}
        />

        <Button
          loading={loading}
          type="submit"
          color={"default"}
          text={"Cadastrar"}
        ></Button>
      </StyledForm>
    </>
  );
}
