import styled from 'src/styled-components';

export default styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.inset.s} ${({ theme }) => theme.inset.m};
  margin-bottom: ${({ theme }) => theme.spacing.m};
`;
