import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map, Observable, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;

  constructor(private http: HttpClient, private router: Router) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}login/refresh`, {
      headers: { 'x-token': this.token }
    }).pipe(
      map((res: any) => {
        const { uid, nombre, email, role, img = 'no-image', google } = res.usuario;
        this.usuario = new Usuario(nombre, email, '', img, google, role, uid);

        localStorage.setItem('token', res.token)
        return true
      }),
      catchError(err => of(false))
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}usuarios`, formData).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  updateUser(data: {email: string, nombre: string, role: string}) {
    data = {
      ...data,
      role: this.usuario.role || 'USER_ROLE'
    }
    return this.http.put(`${base_url}usuarios/${this.uid}`, data, {
      headers: { 'x-token': this.token }
    });
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}login`, formData).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}login/google`, { token }).pipe(
      tap((res: any) => localStorage.setItem('token', res.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }

}
