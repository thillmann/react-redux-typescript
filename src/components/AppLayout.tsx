import * as React from 'react';
import Button from 'src/components/shared/Button';
import styled from 'src/styled-components';
import { changeTheme } from 'src/theme';

const AppContainer = styled.div``;

interface IComponentProps {
  onChangeTheme: typeof changeTheme;
}

export default class AppLayout extends React.PureComponent<IComponentProps> {
  public render() {
    const { onChangeTheme } = this.props;
    return (
      <AppContainer>
        <header>
          Header <Button onClick={onChangeTheme}>Change Theme</Button>
        </header>
        <main>{this.props.children}</main>
        <footer>Footer</footer>
      </AppContainer>
    );
  }
}
