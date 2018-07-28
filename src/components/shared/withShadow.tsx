import { ITheme } from 'src/store/theme';
import { StyledComponentClass } from 'styled-components';

interface IShadowProps {
  zindex?: number;
}

export default function withShadow<P, O = P>(
  Component: StyledComponentClass<P, ITheme, O>
) {
  return Component.extend<IShadowProps>`
    box-shadow: ${({ theme, zindex }) =>
      zindex ? theme.boxShadow[`z${zindex}`] : theme.boxShadow.z0};
    &:active {
      box-shadow: ${({ theme, zindex }) =>
        zindex ? theme.boxShadow[`z${zindex + 10}`] : theme.boxShadow.z10};
    }
  `;
}
