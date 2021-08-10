import { SearchService } from './../search.service';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { Tarefa } from './atividade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TasksService } from './tasks.service.service';
import { empty, EMPTY, Observable, Subscription } from 'rxjs';
import { AlertModalService } from '../shared/alert-modal.service';
import { catchError, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnDestroy {
  task: any[] = [];
  todasTarefas!: Tarefa[];
  tarefas: Tarefa[] = [];
  searchSubscribe!: Subscription;
  propertyName: string = 'descricao';
  reverse: boolean = true;
  tarefa!: Tarefa;
  chave: string = '';
  paginaAtual = 1;
  itemsPorPagina = 5;
  deleteModalRef!: BsModalRef;
  tarefaSelecionada!: Tarefa;
  tarefas$!: Observable<Tarefa[]>;

  ordenar(chave: string) {
    this.chave = chave;
    this.reverse = !this.reverse;
  }

  get tarefasPaginadas() {
    return this.tarefas.slice(
      (this.paginaAtual - 1) * this.itemsPorPagina,
      this.paginaAtual * this.itemsPorPagina
    );
  }

  constructor(
    private taskService: TasksService,
    private modalService: BsModalService,
    private search: SearchService,
    private alertModalService: AlertModalService
  ) {}

  ngOnInit(): void {
    this.taskService
      .listar()
      .subscribe(
        (dados: Tarefa[]) => (this.tarefas = this.todasTarefas = dados)
      );
    this.searchSubscribe = this.search.listenSearch().subscribe((text) => {
      this.pesquisar(text);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscribe.unsubscribe();
  }

  pesquisar(texto: string): void {
    this.tarefas = this.todasTarefas.filter((tarefa) => {
      return (
        tarefa.descricao.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
        tarefa.titulo.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
        tarefa.prioridade.toLowerCase().indexOf(texto.toLowerCase()) > -1 ||
        tarefa.status.toLowerCase().indexOf(texto.toLowerCase()) > -1
      );
    });
  }

  cadastrarTarefa() {
    const initialState = {
      resultadoCallback: (tarefaEditada: Tarefa) => {
        this.todasTarefas.push(tarefaEditada);
        this.pesquisar(this.search.text);
      },
    };
    this.modalService.show(TasksFormComponent, {
      initialState,
    });
  }

  editarTarefa(tarefa: Tarefa) {
    const initialState = {
      tarefa,
      resultadoCallback: (tarefaEditada: Tarefa) => {
        Object.assign(tarefa, tarefaEditada);
      },
    };

    this.modalService.show(TasksFormComponent, {
      initialState,
    });
  }

  deletarTarefa(tarefa: Tarefa) {
    this.taskService.deletar(tarefa).subscribe(
      (resultado: any) => {
        console.log('Excluido');
        this.todasTarefas = this.todasTarefas.filter((t) => t.id != tarefa.id);
        this.pesquisar(this.search.text);
      },
      (erro: any) => {
        if (erro.status == 404) {
          console.log('id não localizado');
        }
      }
    );
  }

  lidarComErro() {
    return this.alertModalService.showAlertDanger(
      'Erro ao carregar as Tarefas.'
    );
  }

  rejeitarDelete() {
    this.deleteModalRef.hide();
  }

  emAtualização() {
    this.tarefas$ = this.taskService.listar().pipe(
      catchError((error) => {
        console.error(error);
        this.lidarComErro();
        return empty();
      })
    );
  }

  modalDelete(tarefa: Tarefa) {
    this.tarefaSelecionada = tarefa;

    const result$ = this.alertModalService.showConfirm(
      'Confirmação',
      'Tem certeza que deseja excluir este tarefa?'
    );
    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.taskService.deletar(tarefa) : EMPTY
        )
      )
      .subscribe(
        (sucess) => {
          this.ngOnInit();
        },
        (error) => {
          return this.alertModalService.showAlertDanger(
            'Erro ao remover os Tarefas.'
          );
          console.log(error);
        }
      );
  }
}
