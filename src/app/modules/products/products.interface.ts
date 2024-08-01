import { Types } from 'mongoose';

export interface IDiscount {
  percentage: number;
  discountPrice: number;
  startDate: Date;
  endDate: Date;
}

export interface IProduct {
  title: string;
  description: string;
  price: number;
  category: Types.ObjectId;
  stock: number;
  thumbnail: string;
  discount?: IDiscount;
}
