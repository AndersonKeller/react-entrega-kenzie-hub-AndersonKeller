import styled from "styled-components";
export const StyledForm = styled.form`
  width: 100%;

  color: var(--color-gray0);
  background-color: var(--color-gray3);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 0.5rem;
  box-shadow: 0px 3.19812px 31.9812px -7.99531px rgba(0, 0, 0, 0.25);
  h2,
  p {
    text-align: center;
    color: var(--color-gray1);
  }
  h2 {
    font-size: var(--font-title3);
  }

  span {
    color: var(--color-negative);
    font-weight: 500;
  }
  label {
    font-size: var(--font-text);
  }
  p,
  option,
  select {
    color: var(--color-gray1);
  }
  a {
    background-color: var(--color-gray1);
    color: var(--color-gray0);
    text-align: center;
  }
`;
