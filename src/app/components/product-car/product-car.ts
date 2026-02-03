import { Component, Input } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { Producto } from '../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-car.html',
  styleUrl: './product-car.css',
})
export class ProductCar {
 @Input() product!: Producto;
  showAddedNotification = false;

  constructor(private productService: ProductService) {}


  addToCart(): void {
    this.productService.addToCart(this.product);
    this.showAddedNotification = true;
    setTimeout(() => {
      this.showAddedNotification = false;
    }, 2000);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }

  getDiscount(): number {
    if (this.product.originalPrice) {
      return Math.round(((this.product.originalPrice - this.product.price) / this.product.originalPrice) * 100);
    }
    return 0;
  }
}
