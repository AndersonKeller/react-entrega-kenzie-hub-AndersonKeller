import { Header } from "../../components/Header";
import { StyledMain, StyledModule, StyledName } from "./style";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";
import { StyledButton } from "../../components/Button/styles";

import { StyledForm } from "../../styles/StyledForm";
import { api } from "../../services/api";
import { SelectLevel } from "../../components/SelectLevel";
import { Input } from "../../components/Input";

export function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );

  function userUpdate() {
    const idUser = JSON.parse(window.localStorage.getItem("userId"));
    async function getUpdateUser() {
      await api
        .get(`/users/${idUser}`)
        .then((response) =>
          window.localStorage.setItem("user", JSON.stringify(response.data))
        );
      setUser(JSON.parse(window.localStorage.getItem("user")));
    }
    getUpdateUser();
  }
  function deleteToken() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user");
  }
  const techSchema = yup.object().shape({
    title: yup.string().required("Campo obrigatório"),
    status: yup.string().required("Escolha uma opção"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(techSchema),
  });
  function getUserName() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return user.name;
  }
  function getUserModule() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return user.course_module;
  }
  function getUserTechs() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return setTechs(user.techs);
  }
  function notify(message, type) {
    type === "error" ? toast.error(message) : toast.success(message);
  }
  function submitApi(data) {
    async function createTech() {
      const token = window.localStorage.getItem("token");

      try {
        setLoading(true);
        await api
          .post("/users/techs", data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(() => userUpdate());
        reset();
        notify("Criado com sucesso");

        setTimeout(() => {
          setShowForm(!showForm);
        }, 3000);
      } catch (error) {
        return notify("algo deu errado, não criado", "error");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }
    createTech();
  }
  useEffect(() => {
    getUserTechs();
  }, [user]);

  return (
    <>
      <Header isButton={true} onclick={deleteToken} text={"Sair"}></Header>
      <StyledMain>
        <div className="divHeader">
          <StyledName>Olá, {getUserName()}</StyledName>
          <StyledModule>{getUserModule()}</StyledModule>
        </div>
        <div>
          <h3>Tecnologias</h3>
          <StyledButton loading={false} onClick={() => setShowForm(!showForm)}>
            +
          </StyledButton>
        </div>
        {showForm && (
          <StyledForm noValidate onSubmit={handleSubmit(submitApi)}>
            <h2>Cadastrar tecnologia</h2>
            <Input
              type={"text"}
              label={""}
              id={"name"}
              placeholder={"Nome"}
              register={register("title")}
              errorMsg={errors.title?.message && errors.title.message}
            />
            {/* <input type="text" placeholder="Nome" {...register("title")} />
            {errors.title?.message && <span>{errors.title.message}</span>} */}
            <SelectLevel
              id={"status"}
              register={register("status")}
              name={""}
              errorMsg={errors.status?.message && errors.status.message}
            />

            <StyledButton loading={loading} type={"submit"} color={"default"}>
              Cadastrar tecnologia
            </StyledButton>
          </StyledForm>
        )}
        <ul>
          {techs.map((t) => (
            <li key={t.id}>
              <p>{t.title}</p>
              <span>{t.status}</span>
            </li>
          ))}
        </ul>
      </StyledMain>
    </>
  );
}
