import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudClientesComponent } from './MantenerClientes/crudClientes.component';
import { CrudDonacionComponent } from './GestionDonaciones/crudDonaciones.component';
import { LoginComponent } from './Login/login/login.component';
import { HomeComponentComponent } from './home/home.component.component';
import path from 'path';



const routes: Routes = [

  { path: '' , component: HomeComponentComponent,
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
    component: CrudClientesComponent,
    children: [
      //{ path: 'editar', component: FormularioComponent },
      //{ path: 'ver', component: FormularioComponent }
    ]
  },
 {
    path: 'donaciones',
    component: CrudDonacionComponent,
    children: [
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
