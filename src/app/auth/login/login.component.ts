import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UsuarioService } from '../../services/usuario.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formSubmitted = false;

  loginForm: FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [!!localStorage.getItem('email')]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    var that = this;
    // window.onload = function () {
    google.accounts.id.initialize({
      client_id: "438660844352-m8jm9f9t5aaabld71duhog8l7aa7ste7.apps.googleusercontent.com",
      callback: response => this.ngZone.run(() => this.handleCredentialResponse(response, that))
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
    // }
  }

  onLogin() {
    // console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    }

    this.usuarioService.login(this.loginForm.value).subscribe({
      next: res => {
        if (this.loginForm.get('remember').value) {
          localStorage.setItem('email', this.loginForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        this.router.navigate(['/']);
      },
      error: err => Swal.fire('Error', err.error.msg, 'error')
    })
  }

  handleCredentialResponse(response, that) {
    that.usuarioService.loginGoogle(response.credential).subscribe(res => this.router.navigate(['/']));
  }

}
