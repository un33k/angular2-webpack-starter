import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  styleUrls: [
    './home.style.css'
  ],
  templateUrl: './home.template.html'
})
export class HomeComponent {

    ngOnInit() {
      console.log('Init - `Home` component');
    }
}