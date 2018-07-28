import * as React from 'react';
import { changeTheme } from 'src/store/theme';
import styled from 'src/styled-components';
import AppHeader from './AppHeader';
import RaisedButton from './shared/RaisedButton';

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
          <RaisedButton onClick={onChangeTheme}>Change Theme</RaisedButton>
        </AppHeader>
        <main>{this.props.children}</main>
      </AppContainer>
    );
  }
}
