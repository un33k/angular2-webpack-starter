import { Component } from '@angular/core';

@Component({
  selector: 'about',
  styleUrls: ['./about.style.css'],
  templateUrl: './about.template.html'

})
export class AboutComponent {
  constructor() {

  }

  ngOnInit() {
    console.log('hello `About` component');
  }
  asyncDataWithWebpack() {
  }

}
