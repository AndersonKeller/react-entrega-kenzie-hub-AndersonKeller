import styled, { css } from "styled-components";
export const StyledSelect = styled.select`
  background-color: var(--color-gray2);
  border: none;
  color: var(--color-gray0);
  height: 40px;
  padding-left: 1rem;
  color: var(--color-gray1);
  ${({ margin }) =>
    margin !== "default" &&
    css`
      margin-top: ${margin};
    `}
  label {
    font-size: var(--font-text);
  }
`;
