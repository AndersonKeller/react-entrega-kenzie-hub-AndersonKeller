import { useContext } from "react";
import { TechContext } from "../../context/TechContext";
import { Button } from "../Button";
import { Form } from "../Form";
import { Input } from "../Input";

import { api } from "../../services/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SelectLevel } from "../SelectLevel";
import { StyledModal } from "./style";
import { UserContext } from "../../context/UserContext";
export function Modal() {
  const { deleteTech, editTech } = useContext(TechContext);
  const { user } = useContext(UserContext);
  const id = window.localStorage.getItem("idModal");

  const tech = user.techs.find((t) => t.id === id);

  const editTechSchema = yup.object().shape({
    title: yup.string().required("nome obrigatório"),
    status: yup.string().required("escolha obrigatória"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(editTechSchema),
  });
  function editTechApi(data) {
    console.log(data);
    editTech(data);
  }
  return (
    <StyledModal id={tech.id}>
      <Form onSubmit={handleSubmit(editTechApi)}>
        <Input
          value={tech.title}
          label={"Tecnologia"}
          register={register("title")}
        ></Input>
        <SelectLevel register={register("status")}></SelectLevel>
        <button type={"submit"} color={"default"}>
          ALterar
        </button>
      </Form>
    </StyledModal>
  );
}
