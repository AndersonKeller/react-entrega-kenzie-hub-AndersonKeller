import styled from "styled-components";

export const StyledModal = styled.div`
  width: 300px;
  margin: 0 auto;
  form button {
    background-color: var(--color-primary);
  }
  @media (min-width: 750px) {
    width: 500px;
  }
`;
export const StyledModalWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
