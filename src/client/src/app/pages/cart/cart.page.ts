import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonIcon, IonButton, IonList, IonItem, IonLabel, IonThumbnail, IonText, IonFooter, IonRow, IonCol, IonBadge, IonGrid } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline, addCircle, removeCircle, arrowBackOutline, cartOutline } from 'ionicons/icons';
import { Cart } from '../../services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [ 
    IonCol,
    IonRow,
    IonFooter,
    IonText,
    IonLabel,
    IonItem,
    IonThumbnail,
    IonList,
    IonButton,
    IonIcon,
    IonBackButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink
  ],
})
export class CartPage {
  public cartService = inject(Cart);

  constructor() {
    addIcons({
      trashOutline,
      addCircle,
      removeCircle,
      arrowBackOutline,
      cartOutline,
    });
  }

  increaseItemQuantity(productId: number) {
    const item = this.cartService
      .cartItems()
      .find((i) => i.product.id === productId);
    if (item) {
      this.cartService.addToCart(item.product, 1);
    }
  }

  decreaseItemQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  proceedToCheckout() {
    console.log('Iniciando proceso de pago...');
  }
}
