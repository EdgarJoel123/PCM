import { Component } from '@angular/core';
import { AutentificacionService } from './services/autentificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PCM';

  constructor(private service: AutentificacionService){}


  isLoggedIn(): boolean {
    return this.service.canActivate();
  }
}
