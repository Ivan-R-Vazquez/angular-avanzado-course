import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo: string;
  tituloSub$: Subscription;

  constructor(private router: Router) {
    this.tituloSub$ = this.getArgumentosRuta().subscribe(({titulo}) => {
      this.titulo = titulo;
      document.title = `AdminPro - ${titulo}`;
    });
  }
  
  ngOnInit(): void {
  }
  
  getArgumentosRuta() {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
      map(event => event.snapshot.data)
    );
  }

  ngOnDestroy(): void {
    if (this.tituloSub$) {
      this.tituloSub$.unsubscribe();
    }
  }

}
