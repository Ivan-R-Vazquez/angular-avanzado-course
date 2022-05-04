import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  intervalSub: Subscription;

  constructor() { }

  ngOnInit(): void {
    // this.retornaObservable().pipe(retry(1)).subscribe({
    //   next: valor => console.log('Subs:', valor),
    //   error: err => console.warn('Error:', err),
    //   complete: () => console.info('obs terminado')
    // });
    this.intervalSub = this.retornaIntervalo().subscribe({
      next: console.log,
      error: console.warn,
      complete: () => console.log('obs terminado')
    });
  }

  retornaIntervalo(): Observable<number> {
    return interval(100).pipe(
      take(10),
      map(valor => valor + 1),
      filter(valor => valor % 2 === 0),
    );
  }

  retornaObservable(): Observable<number> {
    let i = 0;
    return new Observable<number>(observer => {
      const intervalo = setInterval(() => {
        observer.next(i);
        i++;
        if (i === 5) {
          clearInterval(intervalo);
          observer.complete();
        }
        if (i === 3) {
          clearInterval(intervalo);
          observer.error('i llegó al valor de 2');
        }
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalSub) {
      this.intervalSub.unsubscribe();
    }
  }

}
