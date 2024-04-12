import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AutentificacionService } from 'src/app/services/autentificacion.service';
import { SharedIDService } from 'src/app/services/shared-id.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  tienepermisoInicio: boolean = false;
  tienepermisoGestionarUsuarios: boolean = false;
  tienepermisoCrearProyecto: boolean = false;
  tienepermisoCargarProyecto: boolean = false;
  tienepermisoEliminarProyecto: boolean = false;
  tienepermisoDatosPrincipales: boolean = false;
  tienepermisoAspectosTecnicos: boolean = false;
  tienepermisoAspectosFinancieros: boolean = false;
  tienepermisoEjecucion: boolean = false;
  tienepermisoProforma: boolean = false;
  tienepermisoReforma: boolean = false;
  tienepermisoPartidaPresupuestaria: boolean = false;
  tienepermisoProcesoSercop: boolean = false;
  tienepermisoContacto: boolean = false;


  constructor(private elementRef: ElementRef,private router: Router, private sharedService: SharedIDService, private authService: AutentificacionService) {
    // Inicializa la matriz de visibilidad con 'false' para cada grupo de opciones
    this.opcionesVisibles = new Array(3).fill(true);

    // Puedes acceder al nombre del proyecto directamente
    this.nombre_proyecto = this.sharedService.getNombreProyecto();
  }

  ngOnInit(): void {
    this.setupSidebarCollapse();

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    userData.forEach((operacion: any) => {
      if (operacion.id_MODULO === 50) {
        if (operacion.id_OPERACION === 27) {
          this.tienepermisoInicio = true;
        }
        if (operacion.id_OPERACION === 29) {
          this.tienepermisoGestionarUsuarios = true;
        }
        if (operacion.id_OPERACION === 30) {
          this.tienepermisoCrearProyecto = true;
        }
        if (operacion.id_OPERACION === 42) {
          this.tienepermisoCargarProyecto = true;
        }
        if (operacion.id_OPERACION === 43) {
          this.tienepermisoEliminarProyecto = true;
        }
        if (operacion.id_OPERACION === 33) {
          this.tienepermisoDatosPrincipales = true;
        }
        if (operacion.id_OPERACION === 34) {
          this.tienepermisoAspectosTecnicos = true;
        }
        if (operacion.id_OPERACION === 35) {
          this.tienepermisoAspectosFinancieros = true;
        }
        if (operacion.id_OPERACION === 36) {
          this.tienepermisoEjecucion = true;
        }
        if (operacion.id_OPERACION === 37) {
          this.tienepermisoProforma = true;
        }
        if (operacion.id_OPERACION === 38) {
          this.tienepermisoReforma = true;
        }
        if (operacion.id_OPERACION === 39) {
          this.tienepermisoPartidaPresupuestaria = true;
        }
        if (operacion.id_OPERACION === 40) {
          this.tienepermisoProcesoSercop = true;
        }
        if (operacion.id_OPERACION === 41) {
          this.tienepermisoContacto = true;
        }
      }
      }); 
  }

  private setupSidebarCollapse(): void {
    const sidebarCollapse = this.elementRef.nativeElement.querySelector('#sidebarCollapse');
    const sidebar = this.elementRef.nativeElement.querySelector('#sidebar');

    if (sidebarCollapse && sidebar) {
      sidebarCollapse.addEventListener('click', () => {
        sidebar.classList.toggle('active');
      });
    }
  }


  public menuVisible = true;

  nombre_proyecto: string;




  // Puedes mantener un seguimiento del estado de visibilidad de las opciones
  opcionesVisibles: boolean[];



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
