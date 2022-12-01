import { StyledHeader } from "./styles";
import Logo from "../../../src/Logo.png";
import { Link } from "react-router-dom";

export function Header({ isButton, text, onclick }) {
  return (
    <StyledHeader isButton={isButton}>
      <img src={Logo} alt="" />
      {isButton ? (
        <Link onClick={onclick} to={"/login"} color={"header"} text={text}>
          {text}
        </Link>
      ) : (
        ""
      )}
    </StyledHeader>
  );
}
