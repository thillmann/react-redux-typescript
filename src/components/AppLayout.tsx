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
  children: React.ReactNode;
}

const AppLayout = ({ cityName, onChangeTheme, children }: IComponentProps) => {
  return (
    <AppContainer>
      <AppHeader>
        You are in {cityName}
        <RaisedButton onClick={onChangeTheme}>Change Theme</RaisedButton>
      </AppHeader>
      <main>{children}</main>
    </AppContainer>
  );
};

export default AppLayout;

