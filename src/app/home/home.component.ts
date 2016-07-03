import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  styleUrls: ['./home.style.css'],
  templateUrl: './home.template.html'
})
export class HomeComponent {
    private dataSub: any;

    constructor() {
    }

    ngOnInit() {
      console.log('Init - `Home` component');
    }
}