import { Component, OnInit ,  ElementRef, Renderer2 } from "@angular/core";
import { Donacion } from "./donacion.model";
//import { Cliente } from "./cliente.model";
import Swal from "sweetalert2";

@Component({
    selector: 'crudClientes-root',
    templateUrl: './crudDonaciones.component.html',
    styleUrls: ['./crudDonaciones.component.css']
    //styleUrls: ['./crudClientes.component.css']
})
export class CrudDonacionComponent implements OnInit{
    donacionLst: Donacion[] = [];
    titulo: string = 'GESTION DE DONACIONES DE ALIMENTOS';

    nrodocumento: string='';
    productorInput: string = '';
    cantidadInput: string ='';
    unidadmedidaInput: string = '';
    fechacaducidadInput: string = '';

    constructor( private elRef: ElementRef, private renderer: Renderer2){}

    ngAfterViewInit() {
        const button = document.getElementById('accordionSidebar');
        if (button) {
          this.renderer.setStyle(button, 'display', 'block');
        }
      } 





    //Ejemplo de añadir js directamente
    ngOnInit(){
        let body = document.body;
        let script = document.createElement('script');
        script.innerHTML = '';
        script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
        script.async = true;
        body.appendChild(script);
    }

    //Ejemplo de añadir js directamente

    agregarDonacion(){

        if(this.nrodocumento === '' || this.productorInput === '' || this.cantidadInput === ''
            || this.unidadmedidaInput === ''  || this.fechacaducidadInput=== ''
         ){
            Swal.fire({
                icon:'warning',
                title:'Hay campos vacíos',
                text: 'Complete los campos solicitados',
                showCloseButton: true,
            })
         }
         else{
            let don = new Donacion(this.nrodocumento,this.productorInput, this.cantidadInput, this.unidadmedidaInput, this.fechacaducidadInput);
            this.donacionLst.push(don);
          
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Se agregó correctamente la Donacion de Alimentos",
                showConfirmButton: true,
                showCloseButton: true,
                showCancelButton: true,
                timer: 5000 //en milisegundos
            });
            this.nrodocumento='';
            this.productorInput = '';
            this.cantidadInput ='';
            this.unidadmedidaInput = '';
            this.fechacaducidadInput='';
         }  
    }

    
}


