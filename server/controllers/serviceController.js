import Service from '../models/Service.js';
import { getAll, createOne, updateOne, deleteOne, toggleStatus } from './baseController.js';

export const getServices = getAll(Service);
export const createService = createOne(Service);
export const updateService = updateOne(Service);
export const deleteService = deleteOne(Service);
export const toggleServiceStatus = toggleStatus(Service);
