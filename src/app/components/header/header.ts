import { Component } from '@angular/core';
import { ProductService } from '../../services/product-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  cartItemCount = 0;
  isCartOpen = false;
  cartItems: any[] = [];
  cartTotal = 0;

  

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.cart$.subscribe(items => {
      this.cartItems = items;
      this.cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      this.cartTotal = this.productService.getCartTotal();
    });
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
  }

  removeItem(productId: number): void {
    this.productService.removeFromCart(productId);
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity > 0) {
      this.productService.updateQuantity(productId, quantity);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  }

  sendToWhatsApp(): void {
  if (this.cartItems.length === 0) {
    return;
  }

  const phoneNumber = '573126151253';
  
  // Construir el mensaje
  let message = '*!Hola! Tenemos un nuevo pedidio DISLICORESAGS*\n\n';
  message += '*Productos:*\n';
  
  this.cartItems.forEach((item, index) => {
    message += `\n${index + 1}. *${item.product.name}*\n`;
    message += `   Cantidad: ${item.quantity}\n`;
    message += `   Precio unitario: ${this.formatPrice(item.product.price)}\n`;
    message += `   Subtotal: ${this.formatPrice(item.product.price * item.quantity)}\n`;
  });
  
  message += `\n*Total: ${this.formatPrice(this.cartTotal)}*\n\n`;
  message += '¡Gracias por tu compra!';
  
  // Codificar el mensaje para URL
  const encodedMessage = encodeURIComponent(message);
  
  // Crear URL de WhatsApp
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Abrir WhatsApp en nueva pestaña
  window.open(whatsappUrl, '_blank');
  
  // Opcional: Limpiar carrito después de enviar
  // this.clearCart();
  // this.toggleCart();
}

}
