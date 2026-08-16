import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../interfaces/result';
import { firstValueFrom } from 'rxjs';

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
  private http = inject(HttpClient);

  private apiUrl = `${environment.apiUrl}/products`;
  constructor() {}

  async getProducts(): Promise<Result<Item[]>> {
    try {
      const response = await firstValueFrom(
        this.http.get<Result<Item[]>>(this.apiUrl)
      );

      return response;

    } catch (error) {
      console.error('Error al conectar con la API de productos:', error);

      return {
        isSuccess: false,
        data: [],
        error: {
          code: 'ERROR_INTERNO',
          description: 'Error de red o servidor al cargar el catálogo.',
        },
      };
    }
  }
}
