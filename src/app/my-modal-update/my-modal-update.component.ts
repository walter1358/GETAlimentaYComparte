import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA , MatDialogRef} from '@angular/material/dialog';
import { Donante } from '../MantenerClientes/donante.model';
import { DonanteService } from '../MantenerClientes/donante.service';
import Swal from 'sweetalert2';
import { CrudClientesComponent } from '../MantenerClientes/crudClientes.component';
import { DialogRef } from '@angular/cdk/dialog';




@Component({
  selector: 'app-my-modal-update',
  templateUrl: './my-modal-update.component.html',
  styleUrl: './my-modal-update.component.css'
})


export class MyModalUpdateComponent {

  donante_id_input: number = 0;
  nrodocumentoinput: string='';
  nombreInput: string = '';
  direccionInput: string ='';
  telefonoInput: string = '';
  emailInput: string = '';
  tipo_donante: number = 0;
  tipo_documento: number = 0;

  donante: Donante;
  idInputDisabled: boolean = true; 

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
  tipoDocSeleccionado: number = 1; // Variable para almacenar el tipo seleccionado



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private donanteService : DonanteService,  
   public dialogRef: MatDialogRef<MyModalUpdateComponent>,


) {
    this.donante = data.donante;
    this.donante_id_input = this.donante.donante_id;
    this.nrodocumentoinput = this.donante.nro_documento;
    this.nombreInput = this.donante.nombre;
    this.direccionInput = this.donante.direccion;
    this.telefonoInput = this.donante.telefono;
    this.emailInput = this.donante.email;
    this.tipo_donante = this.donante.tipo_donante
    this.tipo_documento = this.donante.tipo_documento}
  
    actualizarDonante(){

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
          let donant = new Donante(this.donante_id_input, this.tipo_donante, this.tipo_documento ,this.nrodocumentoinput,this.nombreInput, this.direccionInput, this.telefonoInput, this.emailInput);
          //this.donanteLst.push(donant);
          this.donanteService.actualizarDonantes(donant)
          .subscribe(
              (response) =>{
                  console.log("Resultado de guardar donante");
                  console.log(response);

                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Se actualizo correctamente al cliente",
                      showConfirmButton: true,
                      showCloseButton: true,
                      //showCancelButton: true,
                      timer: 3000 //en milisegundos
                  });
                  this.nrodocumentoinput='';
                  this.nombreInput = '';
                  this.direccionInput ='';
                  this.telefonoInput = '';
                  this.emailInput='';

                  this.dialogRef.close();
                  
                //  this.cruddonante.listarDonantes();
                  //this.listarDonantes();
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