import styled, { css } from "styled-components";

export const StyledHeader = styled.header`
  height: 150px;
  color: var(--color-primary);
  display: flex;
  align-items: center;
  ${({ isButton }) =>
    isButton
      ? css`
          justify-content: space-between;
        `
      : css`
          justify-content: center;
        `}
`;
