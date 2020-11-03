import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { miAnimacion } from './animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    miAnimacion
  ]
})
export class AppComponent {
  title = 'Clinica-online';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
