import * as React from 'react';
import styled from 'src/styled-components';
import { changeTheme } from 'src/theme';
import AppHeader from './AppHeader';
import Button from './shared/Button';

const AppContainer = styled.div`
  background: ${({ theme }) => theme.colors.background};
  height: 100%;
`;

interface IComponentProps {
  cityName: string | null;
  onChangeTheme: typeof changeTheme;
}

export default class AppLayout extends React.PureComponent<IComponentProps> {
  public render() {
    const { cityName, onChangeTheme } = this.props;
    return (
      <AppContainer>
        <AppHeader>
          You are in {cityName}
          <Button onClick={onChangeTheme}>Change Theme</Button>
        </AppHeader>
        <main>{this.props.children}</main>
        <footer>Footer</footer>
      </AppContainer>
    );
  }
}
