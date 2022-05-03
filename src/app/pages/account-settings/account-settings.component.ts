import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  links: NodeListOf<Element>;

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // Solución 1
    // this.lastTheme = localStorage.getItem('theme')?.split('/')[4].split('.')[0] || 'default';
    // document.querySelector(`.${this.lastTheme}`)?.classList.add('working');

    // Solución 2
    // const lastTheme = localStorage.getItem('theme')?.split('/')[4].split('.')[0] || 'default';
    // this.links = document.querySelectorAll('.selector');
    // this.onCheckCurrentTheme(lastTheme);

    this.links = document.querySelectorAll('.selector');
    this.settingsService.checkCurrentTheme(this.links);
  }

  onChangeTheme(theme: string) {
    this.settingsService.changeTheme(theme, this.links);
  }

}
