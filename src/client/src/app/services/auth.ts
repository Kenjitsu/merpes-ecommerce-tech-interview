import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Result } from '../interfaces/result';
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
  private readonly USER_ID = 'merpes_user_id';

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

  public getUserId(): string {
    const id = localStorage.getItem(this.USER_ID);
    return id ? parseInt(id, 10).toString() : '0';
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
        localStorage.setItem(this.USER_ID, authData.id.toString());

        this.isAuthenticated.set(true);
        return response;
      }

      if (!response.isSuccess) {
        console.warn(
          'Login fallido:',
          response.error?.code || response.error?.description,
        );
      }

      return response;
    } catch (error: any) {
      console.error('Error en registro:', error.error);

      return error.error;
    }
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_NAME_KEY);
    localStorage.removeItem(this.USER_ID);

    this.isAuthenticated.set(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  async register(
    name: string,
    email: string,
    password: string,
  ): Promise<Result<AuthResponse>> {
    try {
      const registerData = { name, email, password };

      const response = await firstValueFrom(
        this.http.post<Result<AuthResponse>>(
          `${this.apiUrl}/register`,
          registerData,
        ),
      );

      if (response.isSuccess && response.data) {
        const authData = response.data;
        localStorage.setItem(this.TOKEN_KEY, authData.token);
        localStorage.setItem(this.USER_NAME_KEY, authData.name);
        localStorage.setItem(this.USER_ID, authData.id.toString());

        this.isAuthenticated.set(true);
        return response;
      }
      return response;
    } catch (error: any) {
      console.error('Error en registro:', error.error);

      return error.error;
    }
  }
}
