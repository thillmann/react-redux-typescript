import { ConnectedRouter } from 'connected-react-router';
import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import { history, IRootState } from './store';
import { ThemeProvider } from './styled-components';
import { changeTheme, getTheme } from './theme';

const mapStateToProps = ({ theme }: IRootState) => ({
  theme: getTheme(theme)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChangeTheme: changeTheme
    },
    dispatch
  );

type ComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends React.PureComponent<ComponentProps> {
  public render() {
    const { theme, onChangeTheme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <AppLayout onChangeTheme={onChangeTheme}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact={true} path="/" component={Home} />
            </Switch>
          </ConnectedRouter>
        </AppLayout>
      </ThemeProvider>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
