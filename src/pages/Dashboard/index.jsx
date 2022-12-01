import { Header } from "../../components/Header";
import { StyledMain, StyledModule, StyledName } from "./style";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../components/Button";
import { StyledButton } from "../../components/Button/styles";

import { StyledForm } from "../../styles/StyledForm";

export function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [techs, setTechs] = useState([]);
  function deleteToken() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user");
  }
  const techSchema = yup.object().shape({
    title: yup.string().required("Campo obrigatório").min(5),
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
  function submitApi(data) {
    console.log(data);
  }
  useEffect(() => {
    getUserTechs();
  }, []);

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
          <StyledButton onClick={() => setShowForm(!showForm)}>+</StyledButton>
        </div>
        {showForm && (
          <StyledForm noValidate onSubmit={handleSubmit(submitApi)}>
            <h2>Cadastrar tecnologia</h2>
            <input type="text" placeholder="Nome" {...register("title")} />
            <select name="" id="status" {...register("status")}>
              <option value="">Selecionar status</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </select>
            <StyledButton type={"submit"} color={"default"}>
              Cadastrar tecnologia
            </StyledButton>
          </StyledForm>
        )}
        <ul>
          {techs.map((t) => (
            <li key={t.id}>
              <p>{t.title}</p>
              <p>{t.status}</p>
            </li>
          ))}
        </ul>
      </StyledMain>
    </>
  );
}
