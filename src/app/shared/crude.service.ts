import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IChartData } from '../home/chart/IChartData';
import { Tarefa, listaDeStatus, listaDePrioridades } from '../tasks/atividade';

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

  contaAtividadesPorStatus(): Observable<IChartData[]> {
    return this.listarFirestore().pipe(
      map((tarefas) =>
        listaDeStatus.map((status) => ({
          name: status.text,
          y: tarefas.filter((t) => t.status === status.value).length,
        }))
      )
    );
  }

  contaAtividadesPorPrioridade(): Observable<IChartData[]> {
    return this.listarFirestore().pipe(
      map((tarefas) =>
        listaDePrioridades.map((prioridades) => ({
          name: prioridades.text,
          y: tarefas.filter((t) => t.prioridade === prioridades.value).length,
        }))
      )
    );
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
