import { StyledHeader } from "./styles";
import Logo from "../../../src/Logo.png";
import { Button } from "../Button";

export function Header() {
  return (
    <StyledHeader>
      <img src={Logo} alt="" />
      <Button color={"header"} text={"Voltar"}></Button>
    </StyledHeader>
  );
}
