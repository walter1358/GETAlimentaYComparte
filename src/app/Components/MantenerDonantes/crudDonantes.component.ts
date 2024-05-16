import { Component, OnInit ,  ElementRef, Renderer2, Inject } from "@angular/core";
import { Donante } from "../../model/donante.model";
import Swal from "sweetalert2";
import { DonanteService } from "../../Service/donante.service";
import { response } from "express";
import { error } from "console";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { MyModalUpdateComponent } from "../my-modal-update/my-modal-update.component";
import { AppComponent } from '../../app.component';
import { DOCUMENT } from "@angular/common";
import { share } from "rxjs";
import { AuthGuard } from "../../Service/auth/auth.guard";
import { AuthService } from "../../Service/auth/auth.service";






 
@Component({
    selector: 'crudDonantes-root',
    templateUrl: './crudDonantes.component.html',
    styleUrls: ['./crudDonantes.component.css']
})

export class CrudDonantesComponent implements OnInit{
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


    constructor(
        private donanteService : DonanteService,
        public dialog: MatDialog,
        private elRef: ElementRef, 
        private renderer: Renderer2,
        private miComponente:AppComponent,
        private authGuard:AuthGuard,
        private authService:AuthService,
        @Inject (DOCUMENT) private document: Document,

    ){
        authService.isLoggedIn = true;  
        this.listarDonantes();
        
    }

    ngAfterViewInit() {
        const button = this.document.getElementById('accordionSidebar');
        if (button) {
          this.renderer.setStyle(button, 'display', 'block');
        }

        this.miComponente.menuAnalista();
        
      } 
      
    


    //Ejemplo de añadir js directamente
    ngOnInit(){
        let body = this.document.body;
        let script = this.document.createElement('script');
        script.innerHTML = '';
        script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
        script.async = true;
       // body.appendChild(script);
        this.renderer.appendChild(body,script)
        //this.authService.isLoggedIn = true;  

    }

    
        openModal(donante: Donante) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '800px'; // Establece el ancho del modal
        dialogConfig.height = '700px'; // Establece la altura del modal
        dialogConfig.data = { donante }; // Pasar el objeto Donante como parte de los datos del modal

    

        this.dialog.open(MyModalUpdateComponent, dialogConfig);

         this.dialog.afterAllClosed.subscribe(() => {
            // Este código se ejecutará cuando el modal se cierre
            // Aquí puedes llamar al método listarDonantes() u otra lógica que necesites
            this.listarDonantes();
          });
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




    //Ejemplo de añadir js directamente

    listarDonantes(){
        this.donanteService.obtenerDonantes()
        .subscribe((data:any)=>{
            console.log(data);
            this.donanteLst = data;
        })
    }




    

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
                        title: "Se agregó correctamente al cliente",
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
                    this.listarDonantes();
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
    

    eliminarDonante(id: number) {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede revertir',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',

        }).then((result) => {
            if (result.isConfirmed) {
                this.donanteService.deleteDonante(id).subscribe(
                    () => {
                        Swal.fire(
                            '¡Eliminado!',
                            'El donante ha sido eliminado.',
                            'success'
                        );
                        this.listarDonantes();
                  

                    },
                    (error) => {
                        console.error('Error al eliminar el donante', error);
                        Swal.fire(
                            '¡Error!',
                            'No se pudo eliminar el donante.',
                            'error'
                        );
                    }
                );
            }
        });
    } // fin de eliminar 



    

    
}


