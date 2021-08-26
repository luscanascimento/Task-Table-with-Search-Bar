import { Injectable } from '@angular/core';
import { CrudeService } from './crude.service';
import { listaDePrioridades, listaDeStatus, Tarefa } from '../tasks/atividade';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { IChartData } from '../home/chart/IChartData';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AtividadesService extends CrudeService<Tarefa> {
  constructor(firestore: AngularFirestore) {
    super('tarefas', firestore);
  }

  contaAtividadesPorStatus(): Observable<IChartData[]> {
    return this.listarFirestore().pipe(
      map((models) =>
        listaDeStatus.map((status) => ({
          name: status.text,
          y: models.filter((t) => t.status === status.value).length,
        }))
      )
    );
  }

  contaAtividadesPorPrioridade(): Observable<IChartData[]> {
    return this.listarFirestore().pipe(
      map((models) =>
        listaDePrioridades.map((prioridades) => ({
          name: prioridades.text,
          y: models.filter((t) => t.prioridade === prioridades.value).length,
        }))
      )
    );
  }
}
