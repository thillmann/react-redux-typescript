export { IProject } from './project';
export * from './project.actions';
import projectReducer, {
  getProjects,
  IProjectState,
  ProjectAction
} from './project.reducer';
export { getProjects, IProjectState, ProjectAction };
export default projectReducer;
