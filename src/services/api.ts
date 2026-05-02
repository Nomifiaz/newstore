import { User, Product, Cart, Order } from "../types";

const API_BASE = "/api";

const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  auth: {
    login: async (email: string, password?: string) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      return res.json();
    },
    signup: async (name: string, email: string, password?: string) => {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      return res.json();
    },
  },
  products: {
    list: async (): Promise<Product[]> => {
      const res = await fetch(`${API_BASE}/products`);
      return res.json();
    },
    get: async (id: number): Promise<Product> => {
      const res = await fetch(`${API_BASE}/products/${id}`);
      return res.json();
    },
  },
  categories: {
    list: async (): Promise<string[]> => {
      const res = await fetch(`${API_BASE}/categories`);
      return res.json();
    },
  },
  cart: {
    get: async (): Promise<Cart> => {
      const res = await fetch(`${API_BASE}/cart`, { headers: getHeader() });
      return res.json();
    },
    add: async (productId: number, quantity: number) => {
      const res = await fetch(`${API_BASE}/cart/add`, {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({ productId, quantity }),
      });
      return res.json();
    },
    update: async (productId: number, quantity: number) => {
      const res = await fetch(`${API_BASE}/cart/update/${productId}`, {
        method: "PATCH",
        headers: getHeader(),
        body: JSON.stringify({ quantity }),
      });
      return res.json();
    },
    remove: async (productId: number) => {
      const res = await fetch(`${API_BASE}/cart/remove/${productId}`, {
        method: "DELETE",
        headers: getHeader(),
      });
      return res.json();
    },
    clear: async () => {
      // Prompt says /api/cart/clear/5, so we use a dummy ID or implement generic
      const res = await fetch(`${API_BASE}/cart/clear/all`, {
        method: "DELETE",
        headers: getHeader(),
      });
      return res.json();
    },
  },
  orders: {
    list: async (): Promise<Order[]> => {
      const res = await fetch(`${API_BASE}/oder`, { headers: getHeader() });
      return res.json();
    },
    checkout: async (data: { shippingAddress: string; city: string; phoneNumber: string }) => {
      const res = await fetch(`${API_BASE}/oder/checkout`, {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify(data),
      });
      return res.json();
    },
  },
  rating: {
    submit: async (productId: number, rating: number, comment: string) => {
      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: getHeader(),
        body: JSON.stringify({ productId, rating, comment }),
      });
      return res.json();
    },
  },
};
