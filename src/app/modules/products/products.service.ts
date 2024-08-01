import AppError from '../../errors/AppError';
import { categoryModel } from '../categories/categories.model';
import { IProduct } from './products.interface';
import { productModel } from './products.model';

const createProductService = async (payload: IProduct) => {
  const { category, price, discount, title } = payload;

  // check is the product already available
  const isProductAvailable = await productModel.findOne({
    title: new RegExp(`^${title}$`, 'i'),
  });

  // check if the product already exists

  if (isProductAvailable) {
    throw new AppError(
      409,
      `${title} product is already available. You can increase the quantity.`,
    );
  }

  // check is the category is available
  const isCategoryExists = await categoryModel.findById(category);

  if (!isCategoryExists) {
    throw new AppError(404, 'This category is not found.');
  }

  // calculate the discount and add the discount price field
  if (discount) {
    const discountPrice = (price - price * (discount.percentage / 100)).toFixed(
      2,
    );
    discount.discountPrice = Number(discountPrice);
  }

  const result = await productModel.create(payload);
  return result;
};

export const productService = {
  createProductService,
};
