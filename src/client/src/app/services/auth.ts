import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../models/result';
import { firstValueFrom } from 'rxjs';

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  public isAuthenticated = signal<boolean>(false);
  private readonly TOKEN_KEY = 'merpes_auth_token';
  private readonly USER_NAME_KEY = 'merpes_user_name';

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor() {
    console.log(this.apiUrl);
    this.checkInitialState();
  }

  private checkInitialState() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.isAuthenticated.set(true);
    }
  }
  
  getUserName(): string | null {
    return localStorage.getItem(this.USER_NAME_KEY);
  }

  async login(email: string, password: string): Promise<Result<AuthResponse>> {
    try {
      const loginData = { email, password };

      const response = await firstValueFrom(
        this.http.post<Result<AuthResponse>>(`${this.apiUrl}/login`, loginData),
      );

      if (response.isSuccess && response.data) {
        const authData = response.data;

        localStorage.setItem(this.TOKEN_KEY, authData.token);
        localStorage.setItem(this.USER_NAME_KEY, authData.name);

        this.isAuthenticated.set(true);
        return response;
      }

      if (!response.isSuccess) {
        console.warn('Login fallido:', response.error?.code || response.error?.description);
      }

      return response;
    } catch (err) {
      console.error('Error de red o servidor:', err);
      let response: Result<AuthResponse> = {
        isSuccess: false,
        data: undefined,
        error: {
          code: "ERROR_INTERNO",
          description: "Ha ocurrido un error interno"
        },
      };

      return response;
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_NAME_KEY);
    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
