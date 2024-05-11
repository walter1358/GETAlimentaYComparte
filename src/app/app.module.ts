  import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { CrudClientesComponent } from './MantenerClientes/crudClientes.component';
import { CrudDonacionComponent } from './GestionDonaciones/crudDonaciones.component';
import { CertificacionComponent } from './CerficacionDonaciones/certificacion/certificacion.component';
import { LoginComponent } from './Login/login/login.component';
import {HomeComponentComponent} from './home/home.component.component';
import { DataService } from './data.service';
import { ClientRequest } from 'http';
import { DonanteService } from './MantenerClientes/donante.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MyModalUpdateComponent } from './my-modal-update/my-modal-update.component';
import { VacioComponent } from './vacio/vacio.component';



//import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent, CrudClientesComponent,CrudDonacionComponent, CertificacionComponent,
    LoginComponent, HomeComponentComponent, MyModalUpdateComponent, VacioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule/*,
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
