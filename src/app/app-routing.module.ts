import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudDonantesComponent } from './Components/MantenerDonantes/crudDonantes.component';
import { CrudDonacionComponent } from './Components/GestionDonaciones/crudDonaciones.component';
import { LoginComponent } from './Components/Login/login.component';
import { HomeComponentComponent } from './Components/home/home.component.component';
import path from 'path';
import { VacioComponent } from './Components/vacio/vacio.component';
import { ComponentDonaDineroComponent } from './Components/component-dona-dinero/component-dona-dinero.component';
import { CertificacionesComponent } from './Components/certificaciones/certificaciones.component';
import { ValidaDonacionesComponent } from './Components/valida-donaciones/valida-donaciones.component';
import { AuthGuard } from './Service/auth/auth.guard';



const routes: Routes = [

  { path: '' , component: HomeComponentComponent,
  children: [
    //{ path: 'editar', component: FormularioComponent },
    //{ path: 'ver', component: FormularioComponent }   
  ]
  
  },

  {path: 'vacio' , component: VacioComponent,
  canActivate:[AuthGuard],
    children: [
    //{ path: 'editar', component: FormularioComponent },
    //{ path: 'ver', component: FormularioComponent } 
    ]
  },
  {path: 'certificaciones' , component: CertificacionesComponent,
  canActivate:[AuthGuard],
  children: [
  //{ path: 'editar', component: FormularioComponent },
  //{ path: 'ver', component: FormularioComponent } 
  ]
},


  /*{
    path: '/',
    component: HomeComponent,
    children: []
  },*/
  { path: 'login', component: LoginComponent,
    children: [
      //{ path: 'editar', component: FormularioComponent },
      //{ path: 'ver', component: FormularioComponent }   
    ]
  },
  
  {
    path: 'clientes',
    canActivate:[AuthGuard],
    component: CrudDonantesComponent,
    children: [
      //{ path: 'editar', component: FormularioComponent },
      //{ path: 'ver', component: FormularioComponent }
    ]
  },
 {
    path: 'donaciones',
    canActivate:[AuthGuard],
    component: CrudDonacionComponent,
    children: [
      //{ path: 'editar', component: FormularioComponent },
      //{ path: 'ver', component: FormularioComponent }
    ]
  },


  {
    path: 'donaDinero',
    canActivate:[AuthGuard],
    component: ComponentDonaDineroComponent,
    children:[
            //{ path: 'editar', component: FormularioComponent },
      //{ path: 'ver', component: FormularioComponent }
    ]
  },

  {
    path:'validaDonaciones',
    canActivate:[AuthGuard],
    component:ValidaDonacionesComponent,
    children:[
            //{ path: 'editar', component: FormularioComponent },
      //{ path: 'ver', component: FormularioComponent }      
    ]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
