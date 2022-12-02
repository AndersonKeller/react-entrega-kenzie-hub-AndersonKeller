import styled from "styled-components";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-gray4);
  width: 100%;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
  }
  .divHeader {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }
  .divHeader p {
    color: var(--color-gray1);
  }
  div button {
    background-color: var(--color-gray3);
  }
  h3 {
    color: var(--color-gray0);
    font-weight: 600;
    font-size: var(--font-title2);
  }
  p {
    color: var(--color-gray0);
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: var(--color-gray3);
    padding: 0.5rem;
  }
  ul li {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-gray4);
    padding: 0.75rem;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: var(--color-gray2);
    }
  }
  li span {
    color: var(--color-gray1);
    font-size: var(--font-text);
  }
`;

export const StyledName = styled.h2`
  color: var(--color-gray0);
  font-weight: 700;
  font-size: var(--font-title1);
`;

export const StyledModule = styled.p`
  color: var(--color-gray1);
  font-weight: 600;
  font-size: var(--font-text);
`;
