import styled, { css } from "styled-components";

export const StyledHeader = styled.header`
  height: 150px;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  a {
    background-color: var(--color-gray1);
    color: var(--color-gray0);
  }
  ${({ isButton }) =>
    isButton
      ? css`
          justify-content: space-between;
        `
      : css`
          justify-content: center;
        `}
`;
