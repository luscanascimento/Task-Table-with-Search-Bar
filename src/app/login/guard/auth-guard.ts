import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean> | Promise<boolean> | boolean {
    console.log('Auth-Guard Verify');
    return this.verificarAcesso();
  }

  private verificarAcesso() {
    if (this.auth.usuarioAutenticado) {
      console.log('Auth-guard verify');
      return true;
    }
    return this.router.navigate(['/login']);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    console.log(
      'CanLoad: verificando se usuário pode carregar o código do modulo'
    );
    return this.verificarAcesso();
  }
}
