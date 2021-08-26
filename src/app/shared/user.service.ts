import { User } from 'src/app/login/iuser';
import { Injectable } from '@angular/core';
import { CrudeService } from './crude.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService extends CrudeService<User> {
  constructor(firestore: AngularFirestore) {
    super('usuario', firestore);
  }

  public pesquisaPorUsuarioSenha(usuario: string, senha: string) {
    return from(
      this.getCollection()
        .ref.where('usuario', '==', usuario)
        .where('senha', '==', senha)
        .get()
    ).pipe(map((e) => e.docs.map(this.mapearReferenciaSnapshot)[0]));
  }
}
