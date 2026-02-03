export interface Producto {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  rating: number;
  stock: number;
  alcoholContent: number;
  volume: string;
  origin: string;
  featured?: boolean;
}

export interface CartItem {
  product: Producto;
  quantity: number;
}
