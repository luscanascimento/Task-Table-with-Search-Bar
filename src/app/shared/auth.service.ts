import { User } from './../login/iuser';
import { EventEmitter, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private userService: UserService, private route: Router) {}

  verificarUsuario({ usuario, senha }: { usuario: string; senha: string }) {
    return this.userService.pesquisaPorUsuarioSenha(usuario, senha).pipe(
      map((user) => {
        if (user != null) {
          this.usuarioAutenticado = true;
          this.mostrarMenuEmitter.emit(true);
        } else {
          this.usuarioAutenticado = false;
          this.mostrarMenuEmitter.emit(false);
          this.route.navigate(['']);
        }
        return this.usuarioAutenticado;
      })
    );
  }
}
