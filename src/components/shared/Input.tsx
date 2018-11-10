import styled from 'src/styled-components';

export default styled.input`
  display: inline-flex;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  background: none;
  outline: none;
  padding: ${({ theme }) => theme.inset.xs};
`;
