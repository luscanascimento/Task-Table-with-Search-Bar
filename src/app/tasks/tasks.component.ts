import { SearchService } from './../search.service';
import { TasksFormComponent } from './tasks-form/tasks-form.component';
import { Tarefa, StatusText } from './atividade';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { AlertModalService } from '../shared/alert-modal.service';
import { switchMap, take } from 'rxjs/operators';
import { AtividadesService } from '../shared/atividades.service';

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
    private modalService: BsModalService,
    private search: SearchService,
    private alertModalService: AlertModalService,
    private crude: AtividadesService
  ) {}

  resolveStatusText(tarefa: Tarefa) {
    return StatusText[tarefa.status];
  }

  ngOnInit(): void {
    this.obterTarefas();
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

  lidarComErro() {
    return this.alertModalService.showAlertDanger(
      'Erro ao carregar as Tarefas.'
    );
  }

  modalDelete(tarefa: Tarefa) {
    this.alertModalService
      .showConfirm('Confirmação', 'Tem certeza que deseja excluir este tarefa?')
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.crude.deletarFirestore(tarefa) : EMPTY
        )
      )
      .subscribe(
        (sucess) => {},
        (error) => {
          console.log(error);
          return this.alertModalService.showAlertDanger(
            'Erro ao remover os Tarefas.'
          );
        }
      );
  }

  obterTarefas = () =>
    this.crude.listarFirestore().subscribe((dados: Tarefa[]) => {
      this.tarefas = this.todasTarefas = dados;
    });
}
