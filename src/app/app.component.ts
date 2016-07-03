import { Component, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';

import { AppState } from './app.service';
import { topRoutes as knownRoutes} from './app.routes';

@Component({
  selector: 'app',
  styleUrls: ['./app.style.scss'],
  templateUrl: './app.template.html',
  encapsulation: ViewEncapsulation.None,
})
export class App {
  name: string = 'xChange Portal';
  showMainNav: boolean = false;
  mainNavIcon: string = 'menu';
  private eventSub: any;
  private dataSub: any;

  constructor(
	  public appState: AppState,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private mdIconRegistry: MdIconRegistry) {
      mdIconRegistry.setDefaultFontSetClass('mdi');
  }

  ngOnInit() {

    this.eventSub = this.router.events
      .filter(event => {
        if (event instanceof NavigationEnd) {
          this.showMainNav = false;
	        this.mainNavIcon = 'menu';
	        window.scrollTo(0, 0);
          return true;
        }
        return false;
      })
      .map(_ => this.router.routerState)
      .map(state => {
        let route = this.activatedRoute;
        while(state.firstChild(route)) {
          route = state.firstChild(route);
        }
        return route;
      })
      .map(route => route.snapshot.data)
      .subscribe(data => {
        this.titleService.setTitle(data['title'] || "xChange Portal");
      });
  }

  ngOnDestroy(): any {
    this.eventSub.unsubscribe(); 
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
    this.mainNavIcon = this.showMainNav? 'close' : 'menu';
  }

}