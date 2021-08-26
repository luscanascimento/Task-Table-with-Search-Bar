import {
  Component,
  ElementRef,
  Input,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { IChartData } from '../chart/IChartData';

@Component({
  selector: 'app-chart-column',
  templateUrl: './chart-column.component.html',
  styleUrls: ['./chart-column.component.scss'],
})
export class ChartColumnComponent implements OnInit {
  @ViewChild('containerTwo', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;
  chart!: Highcharts.Chart;

  @Input() titulo!: string;
  @Input() nomeDaSerie!: string;
  @Input() dados: IChartData[] = [];
  @Input() isLoading = false;

  constructor() {}

  private inicializaGrafico() {
    this.chart = Highcharts.chart(
      this.containerRef.nativeElement,
      this.obterOpcoes()
    );
    if (this.isLoading) this.chart.showLoading();
  }
  obterOpcoes(): import('highcharts').Options | any {
    return {
      chart: {
        type: 'column',
      },
      title: this.titulo,
      accessibility: {
        announceNewData: {
          enabled: true,
        },
      },
      xAxis: {
        type: 'category',
      },
      yAxis: {
        title: {
          text: 'Porcentagem por prioridade',
        },
      },
      legend: {
        enabled: false,
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%',
          },
        },
      },
      series: this.construirSeries(this.nomeDaSerie, this.dados),
      credits: {
        enabled: false,
      },
    };
  }

  private construirSeries(nomeDaSerie: string, dados: any[]): any {
    return [
      {
        name: nomeDaSerie,
        colorByPoint: true,
        data: dados,
      },
    ];
  }

  ngOnInit(): void {
    this.inicializaGrafico();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) this.atualizaGrafico(changes);
  }

  atualizaGrafico(changes: SimpleChanges) {
    const dataChange = changes['dados'];
    const nomeDaSerieChange = changes['nomeDaSerie'];

    if (!!dataChange || !!nomeDaSerieChange) {
      this.chart.update({
        series: this.construirSeries(this.nomeDaSerie, this.dados),
      });
    }

    const titleChange = changes['titulo'];
    if (titleChange) {
      this.chart.update({
        title: {
          text: this.titulo,
        },
      });
    }

    const isLoadingChange = changes['isLoading'];
    if (isLoadingChange) {
      if (this.isLoading) this.chart.showLoading();
      else this.chart.hideLoading();
    }
  }
}
