import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

@Component({
  selector: 'app',
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class App {
  name: string = 'xChange';
  showMainNav: boolean = false;

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
  }

}