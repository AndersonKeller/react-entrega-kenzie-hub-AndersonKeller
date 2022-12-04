import styled from "styled-components";

export const StyledInput = styled.fieldset`
  display: flex;
  flex-direction: column;
  border: none;
  gap: 0.5rem;

  input {
    background-color: var(--color-gray2);
    border: none;
    color: var(--color-gray0);
    height: 40px;
    padding-left: 1rem;
    &::placeholder {
      color: var(--color-gray1);
    }
  }
`;
