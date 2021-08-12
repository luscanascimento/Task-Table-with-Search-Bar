import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CrudeService } from '../shared/crude.service';
import { IChartData } from './chart/IChartData';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: IChartData[] = [];
  dados: IChartData[] = [];
  isLoading = false;
  priorityData: IChartData[] = [];

  constructor(private crude: CrudeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.crude.contaAtividadesPorStatus().subscribe((tarefasAgrupadas) => {
      this.data = tarefasAgrupadas;
      this.isLoading = false;
    });

    this.crude.contaAtividadesPorPrioridade().subscribe((tarefasAgrupadas) => {
      this.dados = tarefasAgrupadas;
    });
    debugger;
  }
}
