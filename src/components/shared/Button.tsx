import styled from 'src/styled-components';

const Button = styled.button.attrs({
  type: 'button'
})`
  display: inline-flex;
  background: ${({ theme }) => theme.colors.text};
  background-position: center;
  border: none;
  color: ${({ theme }) => theme.colors.background};
  line-height: 36px;
  font-size: ${({ theme }) => theme.text.s};
  font-weight: 500;
  padding: 0 ${({ theme }) => theme.inset.s};
  border-radius: ${({ theme }) => theme.borderRadius.s};
  text-transform: uppercase;
  outline: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.greyLight};
  }
  &:active {
    background: ${({ theme }) => theme.colors.grey};
  }
`;

export default Button;
