import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {

  // @Input('valor') progreso = 40;
  @Input() progreso = 40;
  @Input() btnClass: string = 'btn-primary';

  // @Output('valor') valorSalida = new EventEmitter<number>();
  @Output() valorSalida = new EventEmitter<number>();

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    if (this.progreso < 0) {
      this.progreso = 0;
    }
    this.valorSalida.emit(this.progreso);
  }

  onChange(nuevoValor: any) {
    if (nuevoValor >= 100) {
      this.progreso = 100;
    } else if (nuevoValor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    console.log(this.progreso);
    this.valorSalida.emit(this.progreso);
  }

}
