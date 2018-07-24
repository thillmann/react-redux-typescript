import { createAction } from 'typesafe-actions';
import { IProject } from './project';

export const addProject = createAction(
  '@@project/ADD',
  resolve => (project: IProject) => resolve(project)
);

export const removeProject = createAction(
  '@@project/REMOVE',
  resolve => (projectId: string) => resolve(projectId)
);
