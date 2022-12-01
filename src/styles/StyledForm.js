import styled from "styled-components";
export const StyledForm = styled.form`
  width: 100%;
  max-width: 400px;
  color: var(--color-gray0);
  background-color: var(--color-gray3);
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  box-shadow: 0px 3.19812px 31.9812px -7.99531px rgba(0, 0, 0, 0.25);
  h2,
  p {
    text-align: center;
  }
  h2 {
    font-size: var(--font-title3);
  }
  p {
    color: var(--color-gray1);
  }
  span {
    color: var(--color-negative);
    font-weight: 500;
  }
  p,
  label {
    font-size: var(--font-text);
  }
  input,
  select {
    background-color: var(--color-gray2);
    border: none;
    color: var(--color-gray0);
    height: 40px;
    padding-left: 1rem;
    &::placeholder {
      color: var(--color-gray1);
    }
  }
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
