import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  base_url = environment.base_url;

  constructor(private http: HttpClient, private router: Router) { }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${this.base_url}login/refresh`, {
      headers: { 'x-token': token }
    }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token)),
      map(res => true),
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${this.base_url}usuarios`, formData).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${this.base_url}login`, formData).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${this.base_url}login/google`, { token }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
