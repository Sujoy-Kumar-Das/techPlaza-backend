import { model, Schema } from 'mongoose';
import { IDiscount, IProduct } from './products.interface';

const DiscountSchema = new Schema<IDiscount>({
  percentage: {
    type: Number,
    required: [true, 'Discount percentage is required'],
    min: [0, 'Discount percentage cannot be less than 0'],
    max: [100, 'Discount percentage cannot be more than 100'],
  },
  startDate: {
    type: Date,
    required: [true, 'Discount start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'Discount end date is required'],
  },
});

const ProductSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    minlength: [50, 'Description should be minimum 50 characters must.'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Product price cannot be less than 0'],
  },
  category: {
    type: Schema.Types.ObjectId,
    required: [true, 'Product category is required'],
    unique: true,
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Product stock cannot be less than 0'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Product thumbnail URL is required'],
    trim: true,
  },
  discount: {
    type: DiscountSchema,
    required: false,
  },
});

export const productModel = model<IProduct>('product', ProductSchema);
