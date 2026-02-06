import Category from '../models/Category.js';
import { getAll, createOne, updateOne, deleteOne } from './baseController.js';

export const getCategories = getAll(Category);
export const createCategory = createOne(Category);
export const updateCategory = updateOne(Category);
export const deleteCategory = deleteOne(Category);
