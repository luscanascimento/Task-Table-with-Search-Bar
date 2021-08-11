import { Tarefa } from './atividade';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private readonly API = 'http://localhost:3000/atividades';
  tarefa!: Tarefa;
  formulario!: FormGroup;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  listar() {
    return this.http.get<Tarefa[]>(this.API);
  }

  salvar(tarefa: Tarefa) {
    if (tarefa?.id == null) {
      return this.http.post<Tarefa>(`${this.API}/`, tarefa);
    } else {
      return this.http.put<Tarefa>(`${this.API}/${tarefa.id}`, tarefa);
    }
  }

  deletar(tarefa: Tarefa) {
    return this.http.delete<Tarefa>(`${this.API}/${tarefa.id}`);
  }
}
