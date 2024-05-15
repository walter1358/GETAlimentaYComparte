  import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CrudDonacionComponent } from './Components/GestionDonaciones/crudDonaciones.component';
import { LoginComponent } from './Components/Login/login.component';
import {HomeComponentComponent} from './Components/home/home.component.component';
import { DataService } from './Service/data.service';
import { ClientRequest } from 'http';
import { DonanteService } from './Service/donante.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MyModalUpdateComponent } from './Components/my-modal-update/my-modal-update.component';
import { VacioComponent } from './Components/vacio/vacio.component';
import { ComponentDonaDineroComponent } from './Components/component-dona-dinero/component-dona-dinero.component';
import { HttpClientModule } from '@angular/common/http';
import { CertificacionesComponent } from './Components/certificaciones/certificaciones.component';
import { PruebaComponent } from './Components/prueba/prueba.component';
import { CrudDonantesComponent } from './Components/MantenerDonantes/crudDonantes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleDonacion } from './model/detalleDonacion.model';





//import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,CrudDonacionComponent, CertificacionesComponent, CrudDonantesComponent,
     HomeComponentComponent, MyModalUpdateComponent, VacioComponent, ComponentDonaDineroComponent, PruebaComponent
     ,LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
    /*,
    DataTablesModule*/
  ],
  providers: [
    provideClientHydration(),
    DataService,
    DonanteService,
    provideAnimationsAsync(),


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
