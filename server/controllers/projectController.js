import Project from '../models/Project.js';
import { getAll, createOne, updateOne, deleteOne } from './baseController.js';

export const getProjects = getAll(Project);
export const createProject = createOne(Project);
export const updateProject = updateOne(Project);
export const deleteProject = deleteOne(Project);
