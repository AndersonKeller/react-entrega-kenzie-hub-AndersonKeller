import { StyledForm } from "./styles";
export function Form({ children, onSubmit, noValidate }) {
  return (
    <StyledForm onSubmit={onSubmit} noValidate={noValidate}>
      {children}
    </StyledForm>
  );
}
