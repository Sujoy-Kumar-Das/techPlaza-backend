import { Types } from 'mongoose';

export interface IDisplay {
  screenSize: string;
  resolution: string;
  protection?: string;
  type: string;
}

export interface IBattery {
  batteryType: string;
  capacity: string;
  placement: string;
  batteryLife: string;
}

export interface ICamera {
  primary: {
    resolution: string;
    lensType?: string;
  };
  secondary: {
    resolution: string;
    lensType?: string;
  };
}

export interface IProductDetails {
  productId: Types.ObjectId;
  images: string[];
  features: string[];
  specifications: {
    display?: IDisplay;
    battery?: IBattery;
    camera?: ICamera;
    processor?: string;
    ram?: string;
    storage?: string;
    waterproof?: boolean;
  };
  brand: string;
  model: string;
  warranty?: {
    period: string;
    coverage: string;
  };
  manufacturer?: string;
  releaseDate?: Date;
  rating?: {
    averageRating: number;
    totalReviews: number;
  };
}
