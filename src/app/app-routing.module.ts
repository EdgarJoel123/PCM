import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { AutentificacionService } from './services/autentificacion.service';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { CreacionComponent } from './formulario/creacion/creacion.component';
import { AspectosTecnicosComponent } from './vistas/aspectos-tecnicos/aspectos-tecnicos.component';
import { AspectosFinancierosComponent } from './vistas/aspectos-finacieros/aspectos-finacieros.component';
import { ProformaComponent } from './vistas/proforma/proforma.component';
import { ReformaComponent } from './vistas/reforma/reforma.component';
import { PartidaPresupuestariaComponent } from './vistas/partida-presupuestaria/partida-presupuestaria.component';
import { ProcesosSercopComponent } from './vistas/procesos-sercop/procesos-sercop.component';
import { EjecucionSockectsComponent } from './vistas/ejecucion-sockects/ejecucion-sockects.component';
import { ContactoComponent } from './formulario/contacto/contacto.component';
import { EliminacionComponent } from './formulario/eliminacion/eliminacion.component';
import { CargarProyectoComponent } from './formulario/cargar-proyecto/cargar-proyecto.component';
import { InsertUpdateAspectosFinancierosComponent } from './formulario/insert-update-aspectos-financieros/insert-update-aspectos-financieros.component';
import { InsertUpdateAspectosTecnicosComponent } from './formulario/insert-update-aspectos-tecnicos/insert-update-aspectos-tecnicos.component';
import { InsertUpdateEjecucionProyectoComponent } from './formulario/insert-update-ejecucion-proyecto/insert-update-ejecucion-proyecto.component';
import { InsertUpdateProformaComponent } from './formulario/insert-update-proforma/insert-update-proforma.component';
import { InsertUpdateReformaComponent } from './formulario/insert-update-reforma/insert-update-reforma.component';
import { InsertUpdatePartidaPresupuestariaComponent } from './formulario/insert-update-partida-presupuestaria/insert-update-partida-presupuestaria.component';
import { InsertUpdateProcesosSercopComponent } from './formulario/insert-update-procesos-sercop/insert-update-procesos-sercop.component';
import { InsertUpdateResponsableTecnicoComponent } from './formulario/insert-update-responsable-tecnico/insert-update-responsable-tecnico.component';
import { ListarComponent } from './FormularioGestiosUsuarios/listar/listar.component';
import { CreacionDetalleComponent } from './FormularioGestiosUsuarios/creacion-detalle/creacion-detalle.component';
import { CreacionRolesComponent } from './FormularioGestiosUsuarios/creacion-roles/creacion-roles.component';
import { CreacionOperacionesComponent } from './FormularioGestiosUsuarios/creacion-operaciones/creacion-operaciones.component';
import { CreacionModulosComponent } from './FormularioGestiosUsuarios/creacion-modulos/creacion-modulos.component';
import { CreacionUsuariosComponent } from './FormularioGestiosUsuarios/creacion-usuarios/creacion-usuarios.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent, canActivate: [AutentificacionService] },
  { path: 'principal', component: PrincipalComponent, canActivate: [AutentificacionService] },
  { path: 'aspectosTecnicos', component: AspectosTecnicosComponent, canActivate: [AutentificacionService] },
  { path: 'aspectosFinancieros', component: AspectosFinancierosComponent, canActivate: [AutentificacionService] },
  { path: 'proforma', component: ProformaComponent, canActivate: [AutentificacionService] },
  { path: 'reforma', component: ReformaComponent, canActivate: [AutentificacionService] },
  { path: 'partipaPresupuestaria', component: PartidaPresupuestariaComponent, canActivate: [AutentificacionService] },
  { path: 'procesosSercop', component: ProcesosSercopComponent, canActivate: [AutentificacionService] },
  { path: 'ejecucioProyecto', component: EjecucionSockectsComponent, canActivate: [AutentificacionService] },
  { path: 'crear', component: CreacionComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarAspectosFinancieros', component: InsertUpdateAspectosFinancierosComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarAspectosTecnicos', component: InsertUpdateAspectosTecnicosComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarEjecucionProyecto', component: InsertUpdateEjecucionProyectoComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarProforma', component: InsertUpdateProformaComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarReforma', component: InsertUpdateReformaComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarPartidaPresupuestaria', component: InsertUpdatePartidaPresupuestariaComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarProcesosSercop', component: InsertUpdateProcesosSercopComponent, canActivate: [AutentificacionService] },
  { path: 'crearActualizarResponsableTecnico', component: InsertUpdateResponsableTecnicoComponent, canActivate: [AutentificacionService] },
  { path: 'eliminarProyecto', component: EliminacionComponent, canActivate: [AutentificacionService] },
  { path: 'contacto', component: ContactoComponent, canActivate:  [AutentificacionService] },
  { path: 'eliminar', component: EliminacionComponent, canActivate: [AutentificacionService] },
  { path: 'cargarProyecto', component: CargarProyectoComponent, canActivate: [AutentificacionService] },
  { path: 'listarUsuarios', component: ListarComponent, canActivate: [AutentificacionService] },
  { path: 'crearDetalle', component: CreacionDetalleComponent, canActivate: [AutentificacionService] },
  { path: 'crearRoles', component: CreacionRolesComponent, canActivate: [AutentificacionService] },
  { path: 'crearOperaciones', component: CreacionOperacionesComponent, canActivate: [AutentificacionService] },
  { path: 'crearModulos', component: CreacionModulosComponent, canActivate: [AutentificacionService] },
  { path: 'crearUsuarios', component: CreacionUsuariosComponent, canActivate: [AutentificacionService] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
