import { Component, OnInit } from '@angular/core';
import { IChartData } from './chart/IChartData';
import { AtividadesService } from '../shared/atividades.service';

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

  constructor(private atividadesService: AtividadesService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.atividadesService
      .contaAtividadesPorStatus()
      .subscribe((tarefasAgrupadas: IChartData[]) => {
        this.data = tarefasAgrupadas;
        this.isLoading = false;
      });
    this.atividadesService
      .contaAtividadesPorPrioridade()
      .subscribe((tarefasAgrupadas: IChartData[]) => {
        this.dados = tarefasAgrupadas;
      });
  }
}
