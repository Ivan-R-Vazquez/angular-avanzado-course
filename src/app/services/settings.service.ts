import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    this.linkTheme?.setAttribute('href', url);
  }

  changeTheme(theme: string, links: NodeListOf<Element>) {
    // Solución 1
    // this.lastTheme = localStorage.getItem('theme')?.split('/')[4].split('.')[0] + '-theme';
    const url = `./assets/css/colors/${theme}.css`;
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    // Solución 1 y 2
    // this.checkCurrentTheme(theme);

    // this.checkCurrentTheme();
    this.checkCurrentTheme(links);
  }

  checkCurrentTheme(links: NodeListOf<Element>) {
  // Solución 1 y 2
  // checkCurrentTheme(theme: string, links: NodeListOf<Element>) {

    // Solución 1
    // document.querySelector(`.${this.lastTheme}`)?.classList.remove('working');
    // document.querySelector(`.${theme}-theme`)?.classList.add('working');

    // Solución 2
    // links.forEach(element => {
    //   element.classList.remove('working');
    //   if (element.className.includes(`${theme}-theme`)) {
    //     element.classList.add('working');
    //   }
    // });

    links.forEach(element => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');
      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });

  }

}
