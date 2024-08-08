import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { categoryModel } from '../categories/categories.model';
import { IProductDetails } from '../productDetails/productDetails.interface';
import productDetailsModel from '../productDetails/productDetails.model';
import { IProduct } from './products.interface';
import { productModel } from './products.model';

type ICreateProduct = {
  product: IProduct;
  productDetails: IProductDetails;
};

const createProductService = async (payload: ICreateProduct) => {
  const { product, productDetails } = payload;
  const { category, price, discount, title } = product;

  // change the title text format
  product.title = title.toLowerCase();

  // Check if the product already exists
  const isProductAvailable = await productModel.findOne({
    title: product.title,
  });

  if (isProductAvailable) {
    throw new AppError(
      409,
      `${title} product is already available. You can increase the quantity.`,
    );
  }

  // Check if the category exists
  const isCategoryExists = await categoryModel.findById(category);

  if (!isCategoryExists) {
    throw new AppError(404, 'This category is not found.');
  }

  // Calculate discount price
  if (discount) {
    const discountPrice = (price - price * (discount.percentage / 100)).toFixed(
      2,
    );
    discount.discountPrice = Number(discountPrice);
  }

  // create a session
  const session = await mongoose.startSession();

  try {
    // start the session
    session.startTransaction();

    // Create the product
    const createProduct = await productModel.create([product], { session });

    if (!createProduct.length) {
      throw new AppError(500, 'failed to create product.');
    }

    // set the product id
    productDetails.productId = createProduct[0]._id;

    const result = await productDetailsModel.create([productDetails], {
      session,
    });

    await session.commitTransaction();

    return result;
  } catch (error) {
    await session.abortTransaction();
    throw new AppError(500, 'Failed to create product.');
  } finally {
    await session.endSession();
  }
};

export const productService = {
  createProductService,
};
