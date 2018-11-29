import { ConnectedRouter } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import AppLayout from "./components/AppLayout";
import { history, IRootState } from "./store";
import { fetchLocation } from "./store/location";
import { changeTheme, getTheme } from "./store/theme";
import { ThemeProvider } from "./styled-components";

const Home = React.lazy(() => import("src/pages/Home"));
const Restaurant = React.lazy(() => import("src/pages/Restaurant"));

const mapStateToProps = ({ theme, location, router }: IRootState) => ({
  cityName: location.cityName,
  theme: getTheme(theme)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onChangeTheme: changeTheme,
      onFetchLocation: fetchLocation
    },
    dispatch
  );

type ComponentProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;

class App extends React.PureComponent<ComponentProps> {
  public componentDidMount() {
    this.props.onFetchLocation();
  }

  public render() {
    const { cityName, theme, onChangeTheme } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <AppLayout cityName={cityName} onChangeTheme={onChangeTheme}>
          <React.Suspense fallback={<div>Loading...</div>}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact={true} path="/restaurant/:id" render={this.renderRestaurant} />
                <Route path="/" render={this.renderHome} />
                <Route render={this.renderNoMatch} />
              </Switch>
            </ConnectedRouter>
          </React.Suspense>
        </AppLayout>
      </ThemeProvider>
    );
  }

  public renderHome = (props: any) => {
    return <Home {...props} />;
  };

  public renderRestaurant = (props: any) => {
    return <Restaurant {...props} />;
  };

  public renderNoMatch = () => {
    return <div>Not found.</div>;
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
