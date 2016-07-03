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
  encapsulation: ViewEncapsulation.None
})
export class App {
  name: string = 'xChange Portal';
  showMainNav: boolean = false;
  mainNavIcon: string = 'menu';
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
	  public appState: AppState,
    private mdIconRegistry: MdIconRegistry) {
      mdIconRegistry.setDefaultFontSetClass('mdi');
  }

  ngOnInit() {
   this.sub = this.router.events.subscribe(s => {
	    if (s instanceof NavigationEnd) {
        this.title.setTitle(this.getRouteTitle(s.url));
        this.showMainNav = false;
        this.mainNavIcon = 'menu';
        window.scrollTo(0, 0);
      }
    }); 
  }

  ngOnDestroy(): any {
    this.sub.unsubscribe(); 
  }

  toggleMainMenu(event) {
    this.showMainNav = !this.showMainNav;
    this.mainNavIcon = this.showMainNav? 'close' : 'menu';
  }

  getRouteTitle(url: string): string {
    var title: string = this.name;
    for (var item of knownRoutes) {
      if (url == `/${item.path}` && 'data' in item && 'title' in item.data) {
        title = `${title} | ${item.data['title']}`;
        break;
      }
    }
    return title;
  }

}