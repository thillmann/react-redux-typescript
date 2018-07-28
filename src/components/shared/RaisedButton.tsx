import Button from './Button';

interface IRaisedButtonProps {
  zindex?: number;
}

const RaisedButton = Button.extend<IRaisedButtonProps>`
  box-shadow: ${({ theme, zindex }) =>
    zindex ? theme.boxShadow[`z${zindex}`] : theme.boxShadow.z0};
  &:active {
    box-shadow: ${({ theme, zindex }) =>
      zindex ? theme.boxShadow[`z${zindex + 10}`] : theme.boxShadow.z10};
  }
`;

export default RaisedButton;
