export interface ProductType {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: string[];
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SingleProductData extends ProductType {
  reviews : Review[]
}

export interface SingleProductType {
  data: SingleProductData;
}