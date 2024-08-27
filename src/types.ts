export interface IDimentions {
  width: number;
  height: number;
  depth: number
}

export interface IReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string
}

export interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: Array<string>;
  sku: string;
  weight: number;
  dimensions: IDimentions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Array<IReview>
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: IMeta;
  images: Array<string>;
  thumbnail: string
}

export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface INotification {
  message: string;
  type: NotificationType;
  visible: boolean;
}

export interface IGetProductOptions {
  skip?: number;
  limit?: number;
  q?: string;
}

export interface IProductPage {
  products: Array<IProduct>;
  total: number;
  skip: number;
  limit: number;
}
