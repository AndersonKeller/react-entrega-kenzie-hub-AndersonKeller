import { StyledInput } from "./styles";

export function Input({ label, id, placeholder, type, register, errorMsg }) {
  return (
    <>
      <StyledInput>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} placeholder={placeholder} {...register} />
      </StyledInput>
      {errorMsg && <span>{errorMsg}</span>}
    </>
  );
}
