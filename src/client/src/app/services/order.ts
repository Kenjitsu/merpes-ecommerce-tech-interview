import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Auth } from './auth';
import { CreateOrderRequest, OrderResponseDto } from '../interfaces/order.dto';
import { Result } from '../interfaces/result';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Order {
  private http = inject(HttpClient);
  private authService = inject(Auth);

  private apiUrl = `${environment.apiUrl}/orders`;

  constructor() {}

  async createOrder(
    orderRequest: CreateOrderRequest,
  ): Promise<Result<OrderResponseDto>> {
    try {
      const token = this.authService.getToken();

      if (!token) {
        throw new Error('No hay sesión activa.');
      }

      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`,
      });

      const response = await firstValueFrom(
        this.http.post<Result<OrderResponseDto>>(`${this.apiUrl}/create`, orderRequest, {
          headers,
        }),
      );

      return response;
    } catch (error) {
      console.error('Error al conectar con la API de pedidos:', error);
      return {
        isSuccess: false,
        data: {} as OrderResponseDto,
        error: {
          code: "ERROR_INTERNO",
          description: "Ha ocurrido un error"
        },
      };
    }
  }
}
