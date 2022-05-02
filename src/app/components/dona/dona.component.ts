import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {

  @Input() title = 'Nueva gráfica';

  @Input() labels: string[] = ['Dato 1', 'Dato 2', 'Dato 3'];
  @Input() data: ChartData<'doughnut'> = {
    labels: this.labels,
    datasets: [
      {
        data: [100, 100, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059']
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
