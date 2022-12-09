import styled from "styled-components";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-gray4);
  width: 100%;
  position: relative;

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
    padding: 0 0.5rem;
    position: relative;
  }
  ul li {
    width: 100%;
    display: flex;

    justify-content: space-between;
    align-items: center;
    background-color: var(--color-gray4);

    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: var(--color-gray2);
    }
  }
  li div span {
    color: var(--color-gray1);
    font-size: var(--font-text);
  }
  li div {
    display: flex;
    justify-content: space-between;

    width: 40%;
    gap: 1rem;
    overflow: hidden;
    flex-direction: column;
  }
  li button {
    color: var(--color-gray0);
  }
  .divBtns {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .divBtns button {
    color: var(--color-gray0);
  }
  @media (min-width: 760px) {
    .divBtns {
      flex-direction: row;
      width: 40%;
      transition: 1s ease;
    }
    li div {
      flex-direction: row;
      width: 50%;
    }
  }
  @media (max-width: 759px) {
    .divBtns {
      transition: 1s ease;
    }
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
