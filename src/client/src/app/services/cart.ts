import { computed, Injectable, signal } from '@angular/core';
import { Item } from './product';

export interface CartItem {
  product: Item;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  cartItems = signal<CartItem[]>([]);

  totalItems = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0),
  );
  totalPrice = computed(() =>
    this.cartItems().reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0,
    ),
  );

  constructor() {}

  addToCart(product: Item, quantityToAdd: number = 1) {
    this.cartItems.update((items) => {
      const existingItem = items.find((i) => i.product.id === product.id);

      if (existingItem) {
        return items.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantityToAdd }
            : i,
        );
      }

      return [...items, { product, quantity: quantityToAdd }];
    });
  }

  decreaseQuantity(productId: number) {
    this.cartItems.update((items) => {
      const existingItem = items.find((i) => i.product.id === productId);

      if (!existingItem) return items;

      if (existingItem.quantity > 1) {
        return items.map((i) =>
          i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
        );
      } else {
        return items.filter((i) => i.product.id !== productId);
      }
    });
  }

  removeFromCart(productId: number) {
    this.cartItems.update((items) =>
      items.filter((i) => i.product.id !== productId),
    );
  }

  clearCart() {
    this.cartItems.set([]);
  }
}
