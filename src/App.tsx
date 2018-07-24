import * as React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import logo from './logo.svg';
import { addProject, getProjects, IProject, removeProject } from './projects';
import RaisedButton from './shared/RaisedButton';
import { IRootState } from './store';
import styled, { keyframes, ThemeProvider } from './styled-components';
import { changeTheme, ITheme } from './theme';
import { getTheme } from './theme/theme.reducer';

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  padding: ${({ theme }) => theme.inset.l};
  color: white;
`;

const logoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const AppLogo = styled.img`
  animation: ${logoSpin} infinite 20s linear;
  height: 80px;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppIntro = styled.p`
  font-size: large;
`;

const mapStateToProps = ({ projects, theme }: IRootState) => ({
  projects: getProjects(projects),
  theme: getTheme(theme)
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      onAddProject: addProject,
      onChangeTheme: changeTheme,
      onRemoveProject: removeProject
    },
    dispatch
  );

let globalId = 0;

interface IComponentProps {
  onAddProject: typeof addProject;
  onChangeTheme: typeof changeTheme;
  onRemoveProject: typeof removeProject;
  projects: IProject[];
  theme: ITheme;
}

class App extends React.PureComponent<IComponentProps> {
  public onAddProject = () => {
    this.props.onAddProject({
      id: '' + globalId++,
      name: 'Some Project'
    });
  };

  public onRemoveProject = (projectId: string) => () =>
    this.props.onRemoveProject(projectId);

  public render() {
    return (
      <ThemeProvider theme={this.props.theme}>
        <AppContainer>
          <AppHeader>
            <AppLogo src={logo} alt="logo" />
            <AppTitle>Welcome to React</AppTitle>
            <RaisedButton onClick={this.props.onChangeTheme}>
              Change Theme
            </RaisedButton>
          </AppHeader>
          <AppIntro>
            To get started, edit <code>src/App.tsx</code> and save to reload.<br />
          </AppIntro>
          <RaisedButton onClick={this.onAddProject}>Add Project</RaisedButton>
          {this.renderProjects()}
        </AppContainer>
      </ThemeProvider>
    );
  }

  public renderProjects() {
    const projects = this.props.projects.map(project => (
      <li key={project.id}>
        {project.id} - {project.name}{' '}
        <a onClick={this.onRemoveProject(project.id)}>Remove</a>
      </li>
    ));
    return <ul>{projects}</ul>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
