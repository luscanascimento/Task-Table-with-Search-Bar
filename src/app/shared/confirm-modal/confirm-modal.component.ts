import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalService } from '../alert-modal.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title!: string;
  @Input() msg!: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Confirmar';
  confirmResult!: Subject<boolean>;

  constructor(
    public bsModalRef: BsModalRef,
    private modal: AlertModalService
  ) {}

  aoConfirmar() {
    this.confirmarEFechar(true);
    this.modal.showAlertSucess('Tarefa excluida com sucesso');
  }

  aoFechar() {
    this.confirmarEFechar(false);
  }

  confirmarEFechar(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }
}
