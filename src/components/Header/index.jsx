import { StyledHeader } from "./styles";
import Logo from "../../../src/Logo.png";
import { Button } from "../Button";

export function Header({ isButton, text }) {
  return (
    <StyledHeader isButton={isButton}>
      <img src={Logo} alt="" />
      {isButton ? (
        <Button type={"button"} color={"header"} text={text}></Button>
      ) : (
        ""
      )}
    </StyledHeader>
  );
}
