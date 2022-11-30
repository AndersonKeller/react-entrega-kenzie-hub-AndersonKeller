import { StyledButton } from "./styles";
export function Button({ text, color }) {
  console.log(color);
  return <StyledButton color={color}>{text}</StyledButton>;
}
