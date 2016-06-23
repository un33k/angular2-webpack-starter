import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
  mainNavIcon: string = 'menu';

  constructor(public appState: AppState, public router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.showMainNav = false;
      window.scrollTo(0, 0);
      console.log('router changed');
    }); 
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
    if (this.showMainNav){
      this.mainNavIcon = 'close';
    } else {
      this.mainNavIcon = 'menu';
    }
    
  }

}