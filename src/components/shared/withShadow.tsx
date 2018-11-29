import { ITheme } from 'src/store/theme';
import styled, { StyledComponentBase } from 'styled-components';

interface IShadowProps {
  zindex?: number;
}

export default function withShadow<P extends keyof JSX.IntrinsicElements | React.ComponentType<any>, O extends {}>(
  Component: StyledComponentBase<P, ITheme, O>
) {
  return styled<StyledComponentBase<P, ITheme, O & IShadowProps, never>>(Component)`
    box-shadow: ${({ theme, zindex }) =>
      zindex ? theme.boxShadow[`z${zindex}`] : theme.boxShadow.z0};
    &:active {
      box-shadow: ${({ theme, zindex }) =>
        zindex ? theme.boxShadow[`z${zindex + 10}`] : theme.boxShadow.z10};
    }
  `;
}
