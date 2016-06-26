import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

import { AppState } from './app.service';
import { topRoutes as knownRoutes} from './app.routes';

@Component({
  selector: 'app',
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None
})
export class App implements OnInit, OnDestroy {
  name: string = 'xChange Portal';
  showMainNav: boolean = false;
  mainNavIcon: string = 'menu';
  private subscription: Subscription;

  constructor(
    public appState: AppState,
    private router: Router,
    private title: Title) {
  }

  ngOnInit() {
   this.subscription = this.router.events.subscribe(s => {
	    if (s instanceof NavigationEnd) {
        this.title.setTitle(this.getRouteTitle(s.url));
        this.showMainNav = false;
        this.mainNavIcon = 'menu';
        window.scrollTo(0, 0);
        console.log('router changed ' + s);
      }
    }); 
  }

  ngOnDestroy(): any {
    this.subscription.unsubscribe(); 
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
    this.mainNavIcon = this.showMainNav? 'close' : 'menu';
  }

  getRouteTitle(url: string): string {
    var title: string = this.name;
    for (var item of knownRoutes) {
      if (url == `/${item.path}` && 'data' in item && 'title' in item.data) {
        title = `${title} | ${item.data.title}`;
        break;
      }
      console.log(title);
    }
    return title;
  }

}