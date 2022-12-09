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
import { StyledModal, StyledModalWrapper } from "./style";
import { UserContext } from "../../context/UserContext";

import { MainContext } from "../../context/MainProvider";
export function Modal({ setShowModal, showModal }) {
  const { notify } = useContext(MainContext);
  const { user } = useContext(UserContext);
  const { loading, getUser } = useContext(TechContext);
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
  } = useForm({
    mode: "onBlur",

    resolver: yupResolver(editTechSchema),
  });
  function editTechApi(data) {
    editTech(data);
  }
  function editTech(data) {
    async function editApi() {
      const token = window.localStorage.getItem("token");
      const id = window.localStorage.getItem("idModal");
      try {
        await api.put(`/users/techs/${id}`, data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        notify("Editado");
        setTimeout(() => {
          setShowModal(false);
        }, 3000);
        getUser();
      } catch (error) {
        notify("algo deu errado", "error");
      } finally {
        setShowModal(false);
      }
    }
    editApi();
  }

  return loading ? null : (
    <StyledModalWrapper>
      <StyledModal id={tech.id}>
        <Form onSubmit={handleSubmit(editTechApi)}>
          <Input
            value={tech.title}
            label={"Tecnologia"}
            register={register("title")}
          ></Input>
          <SelectLevel
            errorMsg={errors.status?.message && errors.status.message}
            register={register("status")}
          ></SelectLevel>

          <Button
            loading={loading}
            text={"Alterar"}
            type={"submit"}
            color={"default"}
          ></Button>
        </Form>
      </StyledModal>
    </StyledModalWrapper>
  );
}
