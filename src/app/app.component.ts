import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import { AppState } from './app.service';
import { topRoutes as knownRoutes} from './app.routes';

@Component({
  selector: 'app',
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class App implements OnInit {
  name: string = 'xChange Portal';
  showMainNav: boolean = false;
  mainNavIcon: string = 'menu';

  constructor(
    public appState: AppState,
    private router: Router,
    private title: Title) {
  }

  ngOnInit() {
    this.router.events.subscribe( stateEvent => {
	    if (stateEvent instanceof NavigationEnd) {
        this.title.setTitle(this.getRouteTitle(stateEvent.url));
        this.showMainNav = false;
        window.scrollTo(0, 0);
        console.log('router changed ' + stateEvent);
      }
    }); 
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
    this.mainNavIcon = this.showMainNav? 'close' : 'menu';
  }

  getRouteTitle(url: string): string {
    var title: string = this.name;
    for (var item of knownRoutes) {
      if (url == `/${item.path}` && 'data' in item && 'title' in item.data) {
        title = item.data.title;
        break;
      }
      console.log(title);
    }
    return title;
  }

}