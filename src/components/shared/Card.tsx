import styled from 'src/styled-components';
import withShadow from './withShadow';

export default withShadow(styled.div`
  background: white;
  padding: ${({ theme }) => theme.inset.xs} ${({ theme }) => theme.inset.s};
  border-radius: ${({ theme }) => theme.borderRadius.s};
`);
