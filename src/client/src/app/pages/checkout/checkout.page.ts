import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  AlertController,
  IonButtons,
  IonBackButton,
  IonCardHeader,
  IonCard,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonIcon,
  IonRadioGroup,
  IonRadio,
  IonFooter,
  IonRow,
  IonCol,
  IonButton,
  IonSpinner,
  IonicSafeString,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  locationOutline,
  cashOutline,
  cardOutline,
  checkmarkCircleOutline,
  alertCircleOutline,
} from 'ionicons/icons';
import { Cart } from 'src/app/services/cart';
import { Auth } from 'src/app/services/auth';
import { Order } from 'src/app/services/order';
import { Router, RouterLink } from '@angular/router';
import { CreateOrderRequest, OrderItemDto } from 'src/app/interfaces/order.dto';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [
    IonSpinner,
    IonButton,
    IonCol,
    IonRow,
    IonFooter,
    IonRadio,
    IonRadioGroup,
    IonIcon,
    IonText,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCard,
    IonCardHeader,
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
export class CheckoutPage {
  public cartService = inject(Cart);
  private authService = inject(Auth);
  private orderService = inject(Order);
  private router = inject(Router);
  private alertController = inject(AlertController);

  public userName: string | null = '';
  public loadingConfirm: boolean = false;

  public shippingData = {
    address: 'Calle falsa 123 # 45-67, Bogotá',
    phone: '310 123 4567',
    method: 'Envío Estándar (3-5 días)',
  };

  constructor() {
    addIcons({
      arrowBackOutline,
      locationOutline,
      cashOutline,
      cardOutline,
      checkmarkCircleOutline,
      alertCircleOutline,
    });
    this.userName = this.authService.getUserName();
  }

  async confirmPurchase() {
    if (this.cartService.cartItems().length === 0) {
      await this.presentAlert(
        '¡Advertencia!',
        'Debes agregar productos al carrito para continuar.',
        false,
      );

      return;
    }

    this.loadingConfirm = true;

    try {
      const orderItems: OrderItemDto[] = this.cartService
        .cartItems()
        .map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        }));

      const currentUserId = Number(this.authService.getUserId());

      if (currentUserId === 0) {
        await this.presentAlert(
          'Error de sesión',
          'Vuelve a iniciar sesión.',
          false,
        );
        this.loadingConfirm = false;
        return;
      }

      const orderRequest: CreateOrderRequest = {
        userId: currentUserId,
        items: orderItems,
      };

      const result = await this.orderService.createOrder(orderRequest);

      if (result.isSuccess && result.data) {
        await this.presentAlert(
          '¡Proceso con éxito!',
          `¡Compra confirmada! Pedido #${result.data.id}`,
          true,
        );
        this.cartService.clearCart();
        this.router.navigate(['/catalog'], { replaceUrl: true });
      } else {
        await this.presentAlert(
          '¡Ha ocurrido un error!',
          result.error?.description || 'Error al procesar el pedido.',
          false,
        );
      }
    } catch (error: any) {
      this.presentAlert(
        'Error inesperado.',
        error.error?.description || 'Ha ocurrido un error inesperado',
        false,
      );
    } finally {
      this.loadingConfirm = false;
    }
  }

  async presentAlert(header: string, message: string, isSuccess: boolean) {
    const nativeIcon = isSuccess ? '✅' : '❌';

    const alert = await this.alertController.create({
      header: `${nativeIcon} ${header}`,
      message: message,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Entendido',
          handler: () => {
            if (isSuccess) {
              this.cartService.clearCart();
              this.router.navigate(['/catalog'], { replaceUrl: true });
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
