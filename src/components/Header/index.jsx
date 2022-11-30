import { StyledHeader } from "./styles";
import Logo from "../../../src/Logo.png";
import { Button } from "../Button";

export function Header({ isButton }) {
  return (
    <StyledHeader isButton={isButton}>
      <img src={Logo} alt="" />
      {isButton ? (
        <Button type={"button"} color={"header"} text={"Voltar"}></Button>
      ) : (
        ""
      )}
    </StyledHeader>
  );
}
