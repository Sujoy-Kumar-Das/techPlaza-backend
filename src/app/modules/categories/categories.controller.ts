import sendResponse from '../../utils/SendResponse';
import catchAsync from '../../utils/catchAsync';
import { categoryService } from './categories.services';

const getAllCategoryController = catchAsync(async (req, res) => {
  const result = await categoryService.getAllCategoryService();

  sendResponse(res, {
    statusCode: 200,
    message: 'All category fetched successfully',
    data: result,
    success: true,
  });
});

const getSingleCategoryController = catchAsync(async (req, res) => {
  const result = await categoryService.getSingleCategoryService(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    message: 'Category fetched successfully',
    data: result,
    success: true,
  });
});

const createCategoryController = catchAsync(async (req, res) => {
  const result = await categoryService.createCategoryService(req.body);

  sendResponse(res, {
    statusCode: 200,
    message: 'Category created successfully',
    data: result,
    success: true,
  });
});

const updateCategoryController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.updateCategoryService(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    message: 'Category updated successfully',
    data: result,
    success: true,
  });
});

const deleteCategoryController = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await categoryService.deleteCategoryService(id);

  sendResponse(res, {
    statusCode: 200,
    message: 'Category deleted successfully',
    data: result,
    success: true,
  });
});

export const categoryController = {
  getAllCategoryController,
  getSingleCategoryController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
};
