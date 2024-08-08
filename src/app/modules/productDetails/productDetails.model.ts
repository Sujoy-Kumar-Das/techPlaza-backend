import { model, Schema } from 'mongoose';
import { IProductDetails } from './productDetails.interface';

const productDisplaySchema = new Schema(
  {
    screenSize: {
      type: String,
      required: true,
      message: 'Screen size is required.',
    },
    resolution: {
      type: String,
      required: true,
      message: 'Resolution is required.',
    },
    protection: { type: String },
  },
  {
    _id: false,
  },
);

const productBatterySchema = new Schema(
  {
    batteryType: {
      type: String,
      required: true,
      message: 'Battery type is required.',
    },
    capacity: {
      type: String,
      required: true,
      message: 'Battery capacity is required.',
    },
    placement: {
      type: String,
      required: true,
      message: 'Battery placement is required.',
    },
    batteryLife: {
      type: String,
      required: true,
      message: 'Battery life is required.',
    },
  },
  {
    _id: false,
  },
);

const productCameraSchema = new Schema(
  {
    primary: {
      resolution: {
        type: String,
        required: true,
        message: 'Primary camera resolution is required.',
      },
      lensType: { type: String },
    },
    secondary: {
      resolution: {
        type: String,
        required: true,
        message: 'Secondary camera resolution is required.',
      },
      lensType: { type: String },
    },
  },
  {
    _id: false,
  },
);

const ProductDetailsSchema = new Schema<IProductDetails>(
  {
    productId: {
      type: Schema.Types.ObjectId,
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required.'],
    },
    features: {
      type: [String],
      required: [true, 'Features are required.'],
    },
    specifications: {
      display: { type: productDisplaySchema },
      battery: { type: productBatterySchema },
      camera: { type: productCameraSchema },
      processor: { type: String },
      ram: { type: String },
      storage: { type: String },
      waterproof: { type: Boolean },
    },
    brand: {
      type: String,
      required: [true, 'Brand is required.'],
    },
    model: {
      type: String,
      required: [true, 'Model is required.'],
    },
    warranty: {
      period: { type: String },
      coverage: { type: String },
    },
    manufacturer: { type: String },
    releaseDate: { type: Date },
    rating: {
      averageRating: { type: Number },
      totalReviews: { type: Number },
    },
  },
  { timestamps: true, versionKey: false },
);

const productDetailsModel = model<IProductDetails>(
  'ProductDetail',
  ProductDetailsSchema,
);

export default productDetailsModel;
