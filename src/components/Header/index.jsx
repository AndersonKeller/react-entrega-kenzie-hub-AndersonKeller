import { StyledHeader } from "./styles";
import Logo from "../../../src/Logo.png";

export function Header() {
  return (
    <StyledHeader>
      <img src={Logo} alt="" />
      <button>Voltar</button>
    </StyledHeader>
  );
}
