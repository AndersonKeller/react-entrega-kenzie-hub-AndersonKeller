import { StyledButton } from "./styles";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
export function Button({ text, color, type }) {
  const [page, setPage] = useState(false);

  useEffect(() => {
    if (page) {
      navigate("/login");
    }
  }, [page]);
  const navigate = useNavigate();
  return (
    <StyledButton onClick={() => setPage(true)} type={type} color={color}>
      {text}
    </StyledButton>
  );
}
