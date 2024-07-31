import { Schema, model } from 'mongoose';
import { ICategory, ICategoryModel } from './categories.interface';

const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Category title is required.'],
    },
    icon: {
      type: String,
      required: [true, 'Icon is required.'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required.'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      select: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// query middleware functions

categorySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

categorySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method

categorySchema.statics.isCategoryExistsByTitle = async (title: string) => {
  return await categoryModel.findOne({ title });
};

categorySchema.statics.isCategoryExistsById = async (id: string) => {
  return await categoryModel.findById(id).select('+isDeleted');
};

export const categoryModel = model<ICategory, ICategoryModel>(
  'category',
  categorySchema,
);
