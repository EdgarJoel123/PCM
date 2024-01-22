import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formData = {
    username: '',
    password: ''
  };

  constructor(
    public autentificacion: AutentificacionService,
    private router: Router,
  ) {
    if (autentificacion.canActivate()) {
      this.router.navigate(['/inicio']);
    }
  }

  login(formulario: any){
    this.autentificacion.validarUsuario(formulario);
  }
}
