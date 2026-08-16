import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonBadge, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonRow, IonGrid, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonText, ToastController, IonSpinner } from '@ionic/angular/standalone';
import { Item, Product } from '../../services/product';
import { Cart } from '../../services/cart';
import { addIcons } from 'ionicons';
import { addCircle, removeCircle, cartOutline, personCircleOutline, addCircleOutline, removeCircleOutline, checkmarkCircleOutline, alertCircleOutline, logInOutline, exitOutline, newspaperOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { Auth } from 'src/app/services/auth';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
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
  private productService = inject(Product);
  public authService = inject(Auth);
  public cartService = inject(Cart);
  private toastController = inject(ToastController);

  public products: Item[] = [];
  public localQuantities: Record<number, number> = {};

  public loading: boolean = true;

  constructor() {
    addIcons({
      addCircle,
      removeCircle,
      cartOutline,
      personCircleOutline,
      addCircleOutline,
      removeCircleOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
      logInOutline,
      exitOutline,
      newspaperOutline
    });
  }

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.loading = true;

    const result = await this.productService.getProducts();

    if (result.isSuccess && result.data) {
      this.products = result.data;
    } else {
      this.presentToast(
        result.error?.description || result.message || 'Error al cargar productos.',
        'danger',
        'alert-circle-outline',
      );
      this.products = [];
    }

    this.loading = false;
  }

  getQuantity(productId: number): number {
    return this.localQuantities[productId] || 1;
  }

  increaseQuantity(productId: number) {
    this.localQuantities[productId] = this.getQuantity(productId) + 1;
  }

  decreaseQuantity(productId: number) {
    const currentQty = this.getQuantity(productId);
    if (currentQty > 1) {
      this.localQuantities[productId] = currentQty - 1;
    }
  }

  async addToCart(product: Item) {
    const quantityToAdd = this.getQuantity(product.id);
    this.cartService.addToCart(product, quantityToAdd);
    this.localQuantities[product.id] = 1;

    this.presentToast(
      `${quantityToAdd}x ${product.name} agregado al carrito`,
      'success',
      'checkmark-circle-outline',
    );
  }

  async presentToast(
    message: string,
    color: 'success' | 'danger',
    icon: string,
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
      icon,
    });
    await toast.present();
  }
}
