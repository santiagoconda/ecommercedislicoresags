import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Producto, CartItem } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Producto[] = [
    {
      id: 1,
      name: 'Aguardiente Amarillo De Manzanarez',
      category: 'Aguardiente',
      price: 48599,
      originalPrice: 50000,
      description: 'Corría el año 1885 cuando en Manzanares, un maravilloso pueblo entre las montañas de Colombia, nace la fórmula del Aguardiente Amarillo, basada en el uso de la mejor caña gorobeta, anís sembrado en el cerro Guadalupe y agua pura del nacimiento del río Santodomingo, su color es vibrante como el sol y su sabor fresco y aromático. A lomo de mula bajaban toneles de roble llenos de este preciado líquido por las empinadas calles de este pintoresco pueblo, que dejaban escapar a gotas su contenido, aprovechado por los que por esta razón se denominaron gotereros. Cuando llovía, los caminos se llenaban de lodo, pero esto no era un obstáculo para quienes querían acercarse a los estancos, como se le llamaba a los expendios de licor, lo que dio origen a la frase que los Manzanareños hicieron suya "De culos pa´l estanco" Unos años después, la Industria Licorera de Caldas compra esta fórmula secreta, preservándola celosamente para que hoy pueda ser disfrutada por todos.',
      image: 'products/aguardienteamarillo.jpeg',
      rating: 4.8,
      stock: 15,
      alcoholContent: 29,
      volume: '750ml',
      origin: 'Manzanarez Colombia',
      featured: true
    },
    {
      id: 2,
      name: 'Licor de Ron Viejo de Caldas Esencial',
      category: 'Ron',
      price: 22350,
      originalPrice: 50000,
      description: 'La versatilidad convertida en sabor, el Licor de Ron Viejo de Caldas Esencial se alza como una opción inigualable. Conservando el inconfundible perfil sensorial de nuestra marca, este licor presenta una característica adicional: su suavidad.',
      image: 'products/rones/rvcesencial.jpg',
      rating: 4.6,
      stock: 23,
      alcoholContent: 29,
      volume: '375ml',
      origin: 'Caldas',
      featured: false
    },
    {
      id: 3,
      name: 'Ron Viejo de Caldas Tradicional',
      category: 'Ron',
      price: 54834,
      originalPrice: 55000,
      description: 'Este ron mantiene la esencia de la marca, con su sabor dulce frutal, madera bajo y ligeramente amargo. Es un homenaje a la tradición y al proceso que ha sido perfeccionado durante generaciones.',
      image: 'products/rones/rvctradicional.jpg',
      rating: 5,
      stock: 30,
      alcoholContent: 35,
      volume: '750ml',
      origin: 'Rusia',
      featured: true

    },
    {
      id: 4,
      name: 'Ron Viejo de Caldas Carta de Oro',
      category: 'Ron',
      price: 95000,
      description: 'Su etiqueta es un reflejo de la calidad que alberga esta botella. Con su sabor a madera, tostado con notas ácidas frutales, herbales y coco, hacen de este ron una experiencia para los paladares más refinados. Este ron lleva consigo los secretos que lo hacen resplandecer.',
      image: 'products/rones/rvccartadeoro.jpg',
      rating: 4.5,
      stock: 18,
      alcoholContent: 42,
      volume: '750ml',
      origin: 'Caldas',
    },
    {
      id: 5,
      name: 'Ron Viejo de Caldas Oscuro',
      category: 'ron',
      price: 50000,
      description: 'Descubre el enigma detrás de cada copa. Nuestro Ron Oscuro está hecho para aquellos que buscan no solo un buen sabor, también buscan una experiencia para recordar. Con una esencia única y matices inesperados, se convierte en el compañero perfecto para los momentos que se viven en secreto. Con el sabor y la complicidad del nuevo Ron Oscuro, lo que pasa en lo oscuro se queda en lo oscuro.',
      image: 'products/rones/rvcoscuro.png',
      rating: 4.8,
      stock: 12,
      alcoholContent: 38,
      volume: '750ml',
      origin: 'caldas'
    },
    {
      id: 6,
      name: 'Licor de Ron Viejo de Caldas Esencial',
      category: 'ron',
      price: 42835,
      originalPrice: 50000,
      description: 'La versatilidad convertida en sabor, el Licor de Ron Viejo de Caldas Esencial se alza como una opción inigualable. Conservando el inconfundible perfil sensorial de nuestra marca, este licor presenta una característica adicional: su suavidad.',
      image: 'products/rones/rvcesencialmedia.jpg',
      rating: 5.0,
      stock: 8,
      alcoholContent: 12,
      volume: '750ml',
      origin: 'Caldas',
      featured: true
    }
    // {
    //   id: 7,
    //   name: 'Coñac XO Reserve',
    //   category: 'Coñac',
    //   price: 445000,
    //   description: 'Coñac excepcional envejecido más de 20 años. Complejo y elegante con notas de frutos secos y chocolate.',
    //   image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400&h=600&fit=crop',
    //   rating: 4.9,
    //   stock: 5,
    //   alcoholContent: 40,
    //   volume: '700ml',
    //   origin: 'Francia'
    // },
    // {
    //   id: 8,
    //   name: 'Mezcal Artesanal Oaxaqueño',
    //   category: 'Mezcal',
    //   price: 178000,
    //   description: 'Mezcal tradicional elaborado con maguey espadín, ahumado perfecto y sabor intenso característico.',
    //   image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=600&fit=crop',
    //   rating: 4.7,
    //   stock: 14,
    //   alcoholContent: 45,
    //   volume: '750ml',
    //   origin: 'México'
    // }
  ];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  constructor() { }
  ngOnInit(){
  }

  getProducts(): Observable<Producto[]> {
    return new BehaviorSubject(this.products).asObservable();
  }

  getFeaturedProducts(): Observable<Producto[]> {
    const featured = this.products.filter(p => p.featured);
    return new BehaviorSubject(featured).asObservable();
  }

  getProductsByCategory(category: string): Observable<Producto[]> {
    const filtered = this.products.filter(p => p.category === category);
    return new BehaviorSubject(filtered).asObservable();
  }

  addToCart(product: Producto, quantity: number = 1): void {
    const currentCart = this.cartSubject.value;
    const existingItem = currentCart.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
      this.cartSubject.next([...currentCart]);
    } else {
      this.cartSubject.next([...currentCart, { product, quantity }]);
    }
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.product.id !== productId);
    this.cartSubject.next(updatedCart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartSubject.value;
    const item = currentCart.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
      this.cartSubject.next([...currentCart]);
    }
  }

  getCartTotal(): number {
    return this.cartSubject.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  clearCart(): void {
    this.cartSubject.next([]);
  }
  
}
