/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface ICategory {
  title: string;
  imageUrl: string;
  icon: string;
  isDeleted: boolean;
}

export interface ICategoryModel extends Model<ICategory> {
  isCategoryExistsByTitle(title: string): Promise<ICategory | null>;
  isCategoryExistsById(id: string): Promise<ICategory | null>;
}
