import { StyledButton } from "./styles";
export function Button({ text, color, type }) {
  console.log(color);
  return (
    <StyledButton type={type} color={color}>
      {text}
    </StyledButton>
  );
}
