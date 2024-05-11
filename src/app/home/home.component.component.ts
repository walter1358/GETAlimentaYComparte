import { Component,  ElementRef, Renderer2 } from '@angular/core';
import { Resend } from 'resend';
import Swal from 'sweetalert2';
import { Donante } from '../MantenerClientes/donante.model';
import { DonanteService } from '../MantenerClientes/donante.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';






@Component({
  selector: 'app-home.component',
  templateUrl: './home.component.component.html',
  styleUrl: './home.component.component.css'
})
export class HomeComponentComponent {

  constructor(
    private donanteService : DonanteService, private elRef: ElementRef, private renderer: Renderer2, private router: Router,
    private http: HttpClient){}

    toNumber: string = '+51962303062';
    message: string = 'Gracias por su registro, bienvenido a Alimenta y Comparte';

        
    donanteLst: Donante[] = [];

    titulo: string = 'MANTENIMIENTO DE DONANTES';

    donante_id_input: number = 0;
    tipo_donante: number =  0;
    tipo_documento: number = 0;
    nrodocumentoinput: string='';
    nombreInput: string = '';
    direccionInput: string ='';
    telefonoInput: string = '';
    emailInput: string = '';

 

  


      isPanelOpen: boolean = false;

      togglePanel() {
        this.isPanelOpen = !this.isPanelOpen;
      }

      
/*
      logout() {
        this.componente.isAuthenticated = false;
      }*/

      mostrarBoton() {
        const button = document.getElementById('accordionSidebar');
        if (button) {
          this.renderer.setStyle(button, 'display', 'block'); // o 'inline', según corresponda
        }

        this.router.navigate(['/vacio'])

      }
      
    
      

      tiposDonador: { id: number, nombre: string }[] = [
        { id: 1, nombre: 'Persona natural' },
        { id: 2, nombre: 'Persona jurídica' }
      ]; // Lista de opciones para el combobox
      tipoSeleccionado: number = 1; // Variable para almacenar el tipo seleccionado

      tipoDocumento: { id: number, nombre: string }[] = [
        { id: 1, nombre: 'DNI' },
        { id: 2, nombre: 'RUC' },
        { id:3 , nombre: 'CE'}
      ]; // Lista de opciones para el combobox
     // Variable para almacenar el tipo seleccionado



    agregarDonante(){

      if(this.nrodocumentoinput === '' || this.nombreInput === '' || this.direccionInput === ''
          || this.telefonoInput === ''  || this.emailInput=== '' 
       ){
          Swal.fire({
              icon:'warning',
              title:'Hay campos vacíos',
              text: 'Complete los campos solicitados',
              showCloseButton: true,
          })
       }
       else{
          let donant = new Donante(this.donante_id_input,this.tipo_donante, this.tipo_documento ,this.nrodocumentoinput,this.nombreInput, this.direccionInput, this.telefonoInput, this.emailInput);
          //this.donanteLst.push(donant);
          this.donanteService.agregarDonantes(donant)
          .subscribe(
              (response) =>{
                  console.log("Resultado de guardar donante");
                  console.log(response);

                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Se ha registrado correctamente",
                      showConfirmButton: true,
                      showCloseButton: true,
                      showCancelButton: true,
                      timer: 5000 //en milisegundos
                  });

                  this.donante_id_input = 0;
                  this.tipo_donante =  0;
                  this.tipo_documento = 0;
                  this.nrodocumentoinput ='';
                  this.nombreInput  = '';
                  this.direccionInput  ='';
                  this.telefonoInput  = '';
                  this.emailInput  = '';
            

              },
              (error) => {

                  Swal.fire({
                      position: "center",
                      icon: "warning",
                      title: "Algo Pasó!",
                      text: "No se logró crear el cliente, vuelva a intentar",
                      showConfirmButton: true,
                      showCloseButton: true,
                      showCancelButton: true,
                      timer: 5000 //en milisegundos
                  });
              }            
          )
          
       }  
  }//Fin agregar cliente
  


}
