import { TasksService } from './../tasks.service.service';
import { Tarefa, listaDePrioridades, listaDeStatus } from './../atividade';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from '../../shared/alert-modal.service';

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.scss'],
})
export class TasksFormComponent implements OnInit {
  formulario!: FormGroup;
  tarefa!: Tarefa;
  prioridades = listaDePrioridades;
  statusList = listaDeStatus;
  mostrarSucess: boolean = false;

  resultadoCallback!: (tarefa: Tarefa) => void;

  constructor(
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private fb: FormBuilder,
    private taskService: TasksService,
    private modal: AlertModalService
  ) {}

  ngOnInit() {
    this.formulario = this.fb.group({
      titulo: [this.tarefa?.titulo],
      id: [this.tarefa?.id],
      dataDeCriacao: [this.tarefa?.dataDeCriacao || new Date()],
      descricao: [
        this.tarefa?.descricao,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      prioridade: [this.tarefa?.prioridade, [Validators.required]],
      status: [this.tarefa?.status, [Validators.required]],
    });
  }

  submit() {
    this.taskService.salvar(this.formulario.value as Tarefa).subscribe(
      (novaTarefa) => {
        this.resultadoCallback(novaTarefa);
        this.bsModalRef.hide();
        this.modal.showAlertSucess('Tarefa criada com sucesso');
      },
      (error) => {
        alert('erro');
      }
    );
  }

  resetar() {
    this.formulario.reset();
  }

  onSubmit() {
    if (this.formulario.valid) {
      this.submit();
      this.mostrarSucess = true;
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach((campo) => {
      const controle = formGroup.get(campo);
      controle?.markAsDirty();
      controle?.markAsTouched();
      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesForm(controle);
      }
    });
  }
}
