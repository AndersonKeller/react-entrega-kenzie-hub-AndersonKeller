import { Header } from "../../components/Header";
import { StyledMain, StyledModule, StyledName } from "./style";
import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { StyledButton } from "../../components/Button/styles";
import { StyledForm } from "../../styles/StyledForm";

export function Dashboard() {
  const [techs, setTechs] = useState([]);
  function deleteToken() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userId");
    window.localStorage.removeItem("user");
  }
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

  useEffect(() => {
    getUserTechs();
  }, []);
  console.log(techs);
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
          <StyledButton>+</StyledButton>
        </div>
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
