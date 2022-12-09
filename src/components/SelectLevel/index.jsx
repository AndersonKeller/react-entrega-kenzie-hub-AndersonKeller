import { StyledSelect } from "../../styles/StyledSelect";

export function SelectLevel({ value, name, register, id, errorMsg }) {
  return (
    <>
      <StyledSelect margin={"1rem"} id={id} name={name} {...register}>
        <option value="">Selecionar status</option>
        <option value="Iniciante">Iniciante</option>
        <option value="Intermediário">Intermediário</option>
        <option value="Avançado">Avançado</option>
      </StyledSelect>
      {errorMsg && <span>{errorMsg}</span>}
    </>
  );
}
