import styled from 'styled-components';

const Button = styled.button`
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: #836fe1;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;

  &:hover {
    background-color: #7355fd;
  }

  &:focus {
    outline: none;
  }
`;
export default Button;
