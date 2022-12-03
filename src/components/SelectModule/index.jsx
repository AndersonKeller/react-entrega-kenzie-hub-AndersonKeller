import { StyledSelect } from "../../styles/StyledSelect";

export function SelectModule({ name, register, id, errorMsg }) {
  console.log(register);
  return (
    <>
      <StyledSelect id={id} name={name} {...register}>
        <option value="">Escolha o módulo</option>
        <option value="Primeiro módulo (Introdução ao Frontend)">
          Primeiro módulo
        </option>
        <option value="Segundo módulo (Frontend Avançado)">
          Segundo módulo
        </option>
        <option value="Terceiro módulo (Introdução ao Backend)">
          Terceiro módulo
        </option>
        <option value="Quarto módulo (Backend Avançado)">Quarto módulo</option>
      </StyledSelect>
      {errorMsg && <span>{errorMsg}</span>}
    </>
  );
}
