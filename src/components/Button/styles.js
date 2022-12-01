import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  ${({ color }) =>
    color === "default"
      ? css`
          background-color: var(--color-primary);
          color: var(--color-gray0);
        `
      : "goRegister"
      ? css`
          background-color: var(--color-gray1);
          color: var(--color-gray0);
        `
      : css`
          background-color: var(--color-gray2);
          color: var(--color-gray0);
        `}
  ${({ loading }) =>
    loading === true &&
    css`
      background-color: var(--color-primary-negative);
    `}
`;
