import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('Algo salió mal');
    //   }
    // });
    // promesa.then(console.log)
    //        .catch(console.log);
    // console.log('Fin del init');
    this.getUsuarios().then(usuarios => console.log(usuarios));
  }

  getUsuarios() {
    // Is it necessary to create a new promise to return fetch data?
    // return new Promise(resolve => {
    //   fetch('https://reqres.in/api/users')
    //     .then(resp => resp.json())
    //     .then(body => resolve(body.data));
    //   });
    return fetch('https://reqres.in/api/users')
      .then(resp => resp.json())
      .then(body => body.data);
  }

}
