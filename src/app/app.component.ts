import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { AppState } from './app.service';

@Component({
  selector: 'app',
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class App {
  name: string = 'xChange Portal';
  showMainNav: boolean = false;
  mainNavIcon: string = 'menu';

  constructor(public appState: AppState, private router: Router, private title: Title) {

  }

  ngOnInit() {
    this.router.events.debounceTime(50).subscribe((navState) => {
      this.title.setTitle(this.getRouteTitle(navState.url));
      this.showMainNav = false;
      window.scrollTo(0, 0);
      console.log('router changed ' + navState.url);
    }); 
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
    this.mainNavIcon = this.showMainNav? 'close' : 'menu';
  }

  getRouteTitle(url: string): string {
    var title: string = this.name;
    switch(url) {
      case '/about':
        title = `${this.name} | About`;
        break;
    }
    return title;
  }

}