import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public menuVisible = true;

  nombre_proyecto: string;




  // Puedes mantener un seguimiento del estado de visibilidad de las opciones
  opcionesVisibles: boolean[];

  constructor(private router: Router, private sharedService: SharedIDService, private authService: AutentificacionService) {
    // Inicializa la matriz de visibilidad con 'false' para cada grupo de opciones
    this.opcionesVisibles = new Array(3).fill(true);

    // Puedes acceder al nombre del proyecto directamente
    this.nombre_proyecto = this.sharedService.getNombreProyecto();
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  toggleOpciones(index: number): void {
    // Cambia el estado de visibilidad del grupo de opciones en el índice dado
    this.opcionesVisibles[index] = !this.opcionesVisibles[index];
  }

  cerrarSesion() {
    localStorage.setItem('token', '');
    localStorage.removeItem('authToken');
    localStorage.setItem('isLoggedIn', 'false');
  
    // Reinicia los valores en el servicio compartido
    this.sharedService.setCodigoUnico(0);  // O el valor predeterminado que desees
    this.sharedService.setNombreProyecto('');
  
    this.router.navigate(['/login']);
  }
  

  toggleMenuOnSmallDevices() {
    if (window.innerWidth <= 768) {
        this.toggleMenu();
    }
}


}
