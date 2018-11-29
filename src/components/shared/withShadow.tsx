import { ITheme } from "src/store/theme";
import styled, {
  StyledComponent
} from "styled-components";

interface IShadowProps {
  zindex?: 0 | 10 | 20 | 30;
}

type Props = IShadowProps & { theme: ITheme; };

export default function withShadow<
  P extends keyof JSX.IntrinsicElements | React.ComponentType<any>,
  O extends {},
  T extends string | number | symbol
>(
  Component: StyledComponent<P, ITheme, O, T>
): StyledComponent<P, ITheme, O & IShadowProps, T | 'zindex'> {
  return styled(Component)`
    box-shadow: ${({ theme, zindex }: Props) =>
      zindex ? theme.boxShadow[`z${zindex}`] : theme.boxShadow.z0};
    &:active {
      box-shadow: ${({ theme, zindex }: Props) =>
        zindex ? theme.boxShadow[`z${zindex + 10}`] : theme.boxShadow.z10};
    }
  `;
}
