import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  ${console.log()}
  ${({ color }) =>
    color === "default"
      ? css`
          background-color: var(--color-primary);
          color: var(--color-gray0);
        `
      : css`
          background-color: var(--color-gray2);
          color: var(--color-gray0);
        `}
`;
