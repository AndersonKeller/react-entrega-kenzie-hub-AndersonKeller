import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SelectModule } from "../../components/SelectModule";
import { Input } from "../../components/Input";
import { UserContext } from "../../context/UserContext";

export function Register() {
  const navigate = useNavigate();
  const { loading, setLoading, notify } = useContext(UserContext);
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
      <Form onSubmit={handleSubmit(onSubmitApi)} noValidate>
        <h2>Crie sua conta</h2>
        <p>Rapido e grátis, vamos nessa</p>
        <Input
          label={"Nome"}
          id={"name"}
          placeholder={"Digite aqui seu nome"}
          type={"text"}
          register={register("name")}
          errorMsg={errors.name?.message && errors.name.message}
        />
        <Input
          id={"email"}
          label={"Email"}
          placeholder={"Digite aqui seu email"}
          type={"email"}
          register={register("email")}
          errorMsg={errors.email?.message && errors.email.message}
        />
        <Input
          label={"Criar senha"}
          id={"password"}
          type={"password"}
          placeholder={"Digite aqui sua senha"}
          register={register("password")}
          errorMsg={errors.password?.message && errors.password.message}
        />
        <Input
          id={"passwordValidate"}
          label={"Confirmar senha"}
          type={"password"}
          placeholder={"Confirme sua senha"}
          register={register("passwordValidate")}
          errorMsg={
            errors.passwordValidate?.message && errors.passwordValidate.message
          }
        />
        <Input
          id={"bio"}
          label={"Bio"}
          placeholder={"Fale sobre você"}
          register={register("bio")}
          errorMsg={errors.bio?.message && errors.bio.message}
        />
        <Input
          id={"contact"}
          label={"Contato"}
          placeholder={"Opção de contato"}
          register={register("contact")}
          errorMsg={errors.contact?.message && errors.contact.message}
        />

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
      </Form>
    </>
  );
}
