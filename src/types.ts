export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  categoryId: number;
  Category: {
    id: number;
    name: string;
  };
  discountType: string;
  discountValue: number;
  finalPrice: number;
  rating: number;
  rating_count: number;
  image: string;
  averageRating: string;
  totalRatings: number;
  discounted_price: number;
}

export interface CartItem extends Product {
  quantity: number;
  total: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface Order {
  id: number;
  userId: number;
  status: string;
  totalAmount: string;
  shippingAddress: string;
  city: string;
  phoneNumber: string;
  orderDate: string;
  OrderItems: {
    productName: string;
    quantity: number;
    price: string;
    total: string;
    Product: { images: string[] };
  }[];
}
