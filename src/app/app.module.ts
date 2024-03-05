import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { HeaderComponent } from './vistas/header/header.component';
import { LoginComponent } from './vistas/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { WebSocketService } from 'src/app/services/web-socket-service.service';
import { EliminacionProyectoComponent } from './formulario/eliminacion-proyecto/eliminacion-proyecto.component';
import { ListarComponent } from './FormularioGestiosUsuarios/listar/listar.component';
import { CreacionDetalleComponent } from './FormularioGestiosUsuarios/creacion-detalle/creacion-detalle.component';
import { CreacionUsuariosComponent } from './FormularioGestiosUsuarios/creacion-usuarios/creacion-usuarios.component';

//const config: SocketIoConfig = { url: 'http://localhost:8080/ejecucionProyecto', options: {} };




@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PrincipalComponent,
    HeaderComponent,
    LoginComponent,
    CreacionComponent,
    AspectosTecnicosComponent,
    AspectosFinancierosComponent,
    ProformaComponent,
    ReformaComponent,
    PartidaPresupuestariaComponent,
    ProcesosSercopComponent,
    EjecucionSockectsComponent,
    ContactoComponent,
    EliminacionComponent,
    CargarProyectoComponent,
    InsertUpdateAspectosFinancierosComponent,
    InsertUpdateAspectosTecnicosComponent,
    InsertUpdateEjecucionProyectoComponent,
    InsertUpdateProformaComponent,
    InsertUpdateReformaComponent,
    InsertUpdatePartidaPresupuestariaComponent,
    InsertUpdateProcesosSercopComponent,
    InsertUpdateResponsableTecnicoComponent,
    EliminacionProyectoComponent,
    ListarComponent,
    CreacionDetalleComponent,
    CreacionUsuariosComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    //SocketIoModule.forRoot(config),
  ],
  providers: [WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
