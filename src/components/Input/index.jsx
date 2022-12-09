import { StyledInput } from "./styles";

export function Input({
  value,
  label,
  id,
  placeholder,
  type,
  register,
  errorMsg,
}) {
  return (
    <>
      <StyledInput>
        <label htmlFor={id}>{label}</label>
        <input
          value={value}
          id={id}
          type={type}
          placeholder={placeholder}
          {...register}
        />
      </StyledInput>
      {errorMsg && <span>{errorMsg}</span>}
    </>
  );
}
