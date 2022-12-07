import { Header } from "../../components/Header";
import { StyledMain, StyledModule, StyledName } from "./style";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { toast } from "react-toastify";
import { StyledButton } from "../../components/Button/styles";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { api } from "../../services/api";
import { SelectLevel } from "../../components/SelectLevel";
import { Input } from "../../components/Input";
import { Navigate, useNavigate } from "react-router-dom";

export function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    return user && user.name;
  }
  function getUserModule() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return user && user.course_module;
  }
  function getUserTechs() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return user && setTechs(user.techs);
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
  async function showProfile() {
    const token = window.localStorage.getItem("token");
    try {
      const resp = await api.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    showProfile();
  }, []);
  return loading ? null : (
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
          <Form noValidate onSubmit={handleSubmit(submitApi)}>
            <h2>Cadastrar tecnologia</h2>
            <Input
              type={"text"}
              label={""}
              id={"name"}
              placeholder={"Nome"}
              register={register("title")}
              errorMsg={errors.title?.message && errors.title.message}
            />

            <SelectLevel
              id={"status"}
              register={register("status")}
              name={""}
              errorMsg={errors.status?.message && errors.status.message}
            />

            <Button
              text={"Cadastrar tecnologia"}
              loading={loading}
              type={"submit"}
              color={"default"}
            ></Button>
          </Form>
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
