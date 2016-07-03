import { Component } from '@angular/core';

@Component({
  selector: 'about',
  styleUrls: ['./about.style.css'],
  templateUrl: './about.template.html'
})
export class AboutComponent {
  private dataSub: any;

  constructor() {
  }

  ngOnInit() {
    console.log('Init `About` component');
  }
  asyncDataWithWebpack() {
  }

}
