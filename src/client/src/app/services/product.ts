import { Injectable } from '@angular/core';

export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class Product {
  private products: Item[] = [
    {
      id: 1,
      name: 'Audífonos Inalámbricos',
      price: 150000,
      description: 'Alta calidad de sonido con cancelación de ruido activa.',
      imageUrl: 'https://picsum.photos/seed/picsum1/300/300',
    },
    {
      id: 2,
      name: 'Teclado Mecánico',
      price: 250000,
      description: 'Switches azules ideales para escritura y gaming.',
      imageUrl: 'https://picsum.photos/seed/picsum2/300/300',
    },
    {
      id: 3,
      name: 'Ratón Ergonómico',
      price: 90000,
      description: 'Diseño vertical para prevenir fatiga en la muñeca.',
      imageUrl: 'https://picsum.photos/seed/picsum3/300/300',
    },
  ];

  constructor() {}

  getProducts(): Item[] {
    return this.products;
  }
}
