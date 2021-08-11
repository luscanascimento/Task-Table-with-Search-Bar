import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentReference,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tarefa } from '../tasks/atividade';

const COLLECTION_NAME = 'tarefas';

@Injectable({
  providedIn: 'root',
})
export class CrudeService {
  constructor(private firestore: AngularFirestore) {}

  salvarFirestore(tarefa: Tarefa) {
    const { id, ...payload } = tarefa;
    if (tarefa?.id == null) {
      this.firestore.collection(COLLECTION_NAME).add(payload);
    } else {
      this.firestore
        .collection(COLLECTION_NAME)
        .doc(id)
        .set(payload, { merge: true });
    }
  }

  listarFirestore(): Observable<Tarefa[]> {
    return this.firestore
      .collection<Tarefa>(COLLECTION_NAME)
      .snapshotChanges()
      .pipe(map((tarefas) => tarefas.map(this.mapearReferenciaParaTarefa)));
  }

  deletarFirestore(tarefa: Tarefa) {
    return this.firestore.collection(COLLECTION_NAME).doc(tarefa.id).delete();
  }

  private mapearReferenciaParaTarefa(tarefaRef: DocumentChangeAction<Tarefa>) {
    const doc = tarefaRef.payload.doc;
    const data = doc.data();
    data.id = doc.id;
    const timestamp = data.dataDeCriacao as any;
    if (typeof data.dataDeCriacao === 'object')
      data.dataDeCriacao = new Date(timestamp?.toMillis());
    return data;
  }
}
