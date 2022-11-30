import { StyledButton } from "./styles";
export function Button({ text, color, type }) {
  return (
    <StyledButton type={type} color={color}>
      {text}
    </StyledButton>
  );
}
