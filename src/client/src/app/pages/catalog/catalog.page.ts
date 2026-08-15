import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText } from '@ionic/angular/standalone';
import { Item, Product } from '../../services/product';
import { Cart } from '../../services/cart';
import { addIcons } from 'ionicons';
import { addCircle, removeCircle, cartOutline, personCircleOutline, addCircleOutline } from 'ionicons/icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonRow,
    IonContent,
    IonHeader,
    IonTitle,
    IonButton,
    IonButtons,
    IonBadge,
    IonIcon,
    IonGrid,
    IonCol,
    IonCard,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class CatalogPage implements OnInit {
  products: Item[] = [];

  productQuantities: Record<number, number> = {};

  private productService = inject(Product);
  public cartService = inject(Cart);

  constructor() {
    addIcons({
      addCircle,
      removeCircle,
      cartOutline,
      personCircleOutline,
      addCircleOutline,
    });
  }

  ngOnInit() {
    this.products = this.productService.getProducts();

    this.products.forEach((p) => {
      this.productQuantities[p.id] = 1;
    });
  }

  getItemQuantity(productId: number): number {
    const item = this.cartService
      .cartItems()
      .find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  }

  increaseQuantity(productId: number) {
    this.productQuantities[productId]++;
  }

  decreaseQuantity(productId: number) {
    if (this.productQuantities[productId] > 1) {
      this.productQuantities[productId]--;
    }
    this.cartService.decreaseQuantity(productId);
  }

  addToCart(product: Item) {
    const quantity = this.productQuantities[product.id];
    this.cartService.addToCart(product, quantity);

    this.productQuantities[product.id] = 1;
  }
}
