import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './services/product-service';
import { Producto } from './models/product.model';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { ProductCar } from './components/product-car/product-car';
import { ChatbotComponent } from "./components/chatbot-component/chatbot-component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header, ProductCar, ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ecommerce';
    featuredProducts: Producto[] = [];
  allProducts: Producto[] = [];
  selectedCategory: string = 'all';

  categories = [
    { id: 'all', name: 'Todos' },
    { id: 'Whisky', name: 'Whisky' },
    { id: 'Ron', name: 'Ron' },
    { id: 'Vodka', name: 'Vodka' },
    { id: 'Aguardiente', name: 'Aguardiente' },
    { id: 'Tequila', name: 'Tequila' }
  ];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });

    this.productService.getProducts().subscribe(products => {
      this.allProducts = products;
    });
  }

  selectCategory(categoryId: string): void {
    this.selectedCategory = categoryId;
  }

  get filteredProducts(): Producto[] {
    if (this.selectedCategory === 'all') {
      return this.allProducts;
    }
    return this.allProducts.filter(p => p.category === this.selectedCategory);
  }
}
