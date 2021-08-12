import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as Highcharts from 'highcharts';
import { IChartData } from './IChartData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnChanges, OnInit {
  @ViewChild('container', { static: true })
  containerRef!: ElementRef<HTMLDivElement>;

  @Input() title!: string;
  @Input() data: IChartData[] = [];
  @Input() serieName!: string;
  @Input() isLoading = false;

  chart!: Highcharts.Chart;

  constructor() {}

  private inicializaGrafico() {
    this.chart = Highcharts.chart(
      this.containerRef.nativeElement,
      this.getOptions()
    );
    if (this.isLoading) this.chart.showLoading();
  }

  ngOnInit() {
    this.inicializaGrafico();
  }

  getOptions(): import('highcharts').Options | any {
    return {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
      },
      title: {
        text: this.title,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: this.construirSeries(this.serieName, this.data),
      credits: {
        enabled: false,
      },
    };
  }

  private construirSeries(serieName: string, data: any[]): any {
    return [
      {
        name: serieName,
        colorByPoint: true,
        data: data,
      },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) this.atualizaGrafico(changes);
  }

  atualizaGrafico(changes: SimpleChanges) {
    const dataChange = changes['data'];
    const serieNameChange = changes['serieName'];

    if (!!dataChange || !!serieNameChange) {
      this.chart.update({
        series: this.construirSeries(this.serieName, this.data),
      });
    }

    const titleChange = changes['title'];
    if (titleChange) {
      this.chart.update({
        title: {
          text: this.title,
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
