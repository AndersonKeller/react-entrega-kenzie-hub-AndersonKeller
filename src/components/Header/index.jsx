import { StyledHeader } from "./styles";
import Logo from "../../../src/Logo.png";
import { Button } from "../Button";

export function Header({ isButton, text, onclick }) {
  return (
    <StyledHeader isButton={isButton}>
      <img src={Logo} alt="" />
      {isButton ? (
        <Button
          onclick={onclick}
          type={"button"}
          color={"header"}
          text={text}
        ></Button>
      ) : (
        ""
      )}
    </StyledHeader>
  );
}
