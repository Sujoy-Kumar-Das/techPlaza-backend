import AppError from '../../errors/AppError';
import { ICategory } from './categories.interface';
import { categoryModel } from './categories.model';

const getAllCategoryService = async () => {
  const result = await categoryModel.find();
  return result;
};

const getSingleCategoryService = async (id: string) => {
  const result = await categoryModel.isCategoryExistsById(id);

  if (!result) {
    throw new AppError(404, 'This category is not found.');
  }

  return result;
};

const createCategoryService = async (payload: ICategory) => {
  payload.title = payload.title.toLocaleLowerCase();
  const { title } = payload;

  // check the category is already exists
  const isCategoryExistsByTitle =
    await categoryModel.isCategoryExistsByTitle(title);

  if (isCategoryExistsByTitle) {
    throw new AppError(409, `${title} category is already exists. `);
  }

  const result = await categoryModel.create(payload);
  return result;
};

const updateCategoryService = async (
  id: string,
  payload: Partial<ICategory>,
) => {
  const { title } = payload;

  // check the category is already exists by id
  const isCategoryExistsById = await categoryModel.isCategoryExistsById(id);

  if (!isCategoryExistsById) {
    throw new AppError(404, `${title} category is not exists. `);
  }

  if (isCategoryExistsById.isDeleted) {
    throw new AppError(404, `${title} category has been deleted. `);
  }

  const result = await categoryModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteCategoryService = async (id: string) => {
  // check the category is already exists by id
  const isCategoryExistsById = await categoryModel.isCategoryExistsById(id);

  if (!isCategoryExistsById) {
    throw new AppError(404, ` This category is not exists. `);
  }

  if (isCategoryExistsById.isDeleted) {
    throw new AppError(404, `This category has been already deleted. `);
  }

  await categoryModel.findByIdAndUpdate(
    { _id: id },
    { isDeleted: true },
    {
      new: true,
    },
  );
  return null;
};

export const categoryService = {
  getAllCategoryService,
  getSingleCategoryService,
  createCategoryService,
  updateCategoryService,
  deleteCategoryService,
};
