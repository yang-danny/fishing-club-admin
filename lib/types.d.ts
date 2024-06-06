type CollectionType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  brand: string;
  description: string;
  media: [string];
  category: string;
  collections: [CollectionType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
  expense: number;
  reviews: number;
  rating: number;
  instock: number;
  createdAt: Date;
  updatedAt: Date;
};

type OrderColumnType = {
  _id: string;
  customer: string;
  products: number;
  totalAmount: number;
  createdAt: string;
};

type OrderItemType = {
  product: ProductType;
  color: string;
  size: string;
  quantity: number;
};

type CustomerType = {
  _id: string;
  clerkId: string;
  name: string;
  email: string;
};
type BrandType = {
  name: string;
  web: string;
  country: string;
  address: string;
  phone: string;
  logo: string;
};
type ReviewType = {
  _id: string;
  customer: CustomerType;
  product: ProductType;
  order: OrderType;
  title: string;
  rating: number;
  media: [string];
  body: string;
  createdAt: Date;
};
type PublishNewsType = {
  _id: string;
  title: string;
  author: string;
  publisher:string;
  media: [string];
  body: string;
};
type EventType = {
  _id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  funder:string;
  media: [string];
  body: string;
  createdAt: Date;
};
