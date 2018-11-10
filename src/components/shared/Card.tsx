import styled from 'src/styled-components';
import withShadow from './withShadow';

export default withShadow(styled.div`
  background: white;
  border-radius: ${({ theme }) => theme.borderRadius.s};
`);
