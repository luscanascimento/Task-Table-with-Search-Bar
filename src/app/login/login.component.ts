import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertModalService } from '../shared/alert-modal.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  credenciais: { usuario: string; senha: string } = {
    usuario: '',
    senha: '',
  };

  constructor(
    private authService: AuthService,
    private alert: AlertModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  fazerLogin() {
    this.authService.verificarUsuario(this.credenciais).subscribe((success) => {
      if (success) {
        return this.router.navigate(['./home']);
      } else {
        return this.alert.showAlertDanger('Usuario ou senha não encontrados');
      }
    });
  }
}
