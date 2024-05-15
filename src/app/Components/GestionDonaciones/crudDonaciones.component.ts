import { Component, OnInit ,  ElementRef, Renderer2 , Inject, Injectable } from "@angular/core";
import { Donacion } from "../../model/donacion.model";
//import { Cliente } from "./cliente.model";
import Swal from "sweetalert2";
import { AppComponent } from "../../app.component";
import { DOCUMENT } from "@angular/common";
import { AuthService } from "../../Service/auth/auth.service";
import { DonanteService } from "../../Service/donante.service";
import { Donante } from "../../model/donante.model";
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DetalleDonacion } from "../../model/detalleDonacion.model";
import { DonacionService } from "../../Service/donacion.service";
import DataTable from "datatables.net-dt";
import DataTables from "datatables.net";
import { Data } from "@angular/router";
import { DataTablesModule } from "angular-datatables";
import { DonaciondetalleService } from "../../Service/donaciondetalle.service";
import { error } from "node:console";


@Component({
    selector: 'crudClientes-root',
    templateUrl: './crudDonaciones.component.html',
    styleUrls: ['./crudDonaciones.component.css']
    //styleUrls: ['./crudClientes.component.css']
})
export class CrudDonacionComponent implements OnInit{
    donacion_Lst: Donacion[] = [];       
    donante_Lst: Donante[] = [];
    detalleDonacion_Lst: DetalleDonacion[] = [];

    titulo: string = 'GESTION DE DONACIONES DE ALIMENTOS';

    //Donante
    donanteMailInput : string  ='' ;
    donanteNombreInput : string = '';
    datosDonante: string = '';
    documentoDonanteI : string = '';
    nrodocumento: string='';

    //Donaciones
    donacionIdInput: number = 0;
    tipoInput = 1;
    cantidadInput: number = 0;
    monedaInput: string = '';
    bancoOrigen: string = '';
    fechaEntregaInput: Date = new Date();
    estadoInput = 1;
    comprobante =  'imagen.jpg';    
    donanteIdInput: number = 0;




    //Donaciones Detalle
    productoInput: string = '';
    cantDetalleInput: number = 0;
    unidadmedidaInput: number = 0;
    //FecCaduInput: string = '';}
    FecCaduInput: Date = new Date();

    

    constructor( private elRef: ElementRef, private renderer: Renderer2,
    private donacionService: DonacionService,
    private miComponente:AppComponent,
    private donanteService: DonanteService,
    private donacionDetalleS : DonaciondetalleService,
    @Inject (DOCUMENT) private _document: Document,
    private authService: AuthService
    ){
      this.listarDonantes();
      this.listarDonaciones();

    }

    ngAfterViewInit() {
        const button = this._document.getElementById('accordionSidebar');
        if (button) {
          this.renderer.setStyle(button, 'display', 'block');
        }

        this.miComponente.menuDonante();

        
        

      } 

      

    //Ejemplo de añadir js directamente
    ngOnInit(){
        let body = this._document.body;
        let script = this._document.createElement('script');
        script.innerHTML = '';
        script.src = 'assets/sbadmin2/js/demo/datatables-demo.js';
        script.async = true;
        body.appendChild(script);     
    }


    
    listarDonaciones(){
      this.donacionService.cargarDonaciones()
      .subscribe((data:any)=>{
          console.log(data);
          //this.donacion_Lst = data;
          this.donacion_Lst = data.filter((dony: any)  => dony.donante_id === this.donanteIdInput );
          console.log('donaciones de: ',this.donacion_Lst)
      })
  }


  




    agregarDetalle(){

      if(this.productoInput === '' || this.cantidadInput ===  0 || this.unidadmedidaInput === 0      
       ){
          Swal.fire({
              icon:'warning',
              title:'Hay campos vacíos',
              text: 'Complete los campos solicitados',
              showCloseButton: true,
          })
       }
       else{
          let detalle_dona = new DetalleDonacion(this.donacionIdInput,this.productoInput,this.cantidadInput, this.unidadmedidaInput ,this.FecCaduInput);
          this.detalleDonacion_Lst.push(detalle_dona)
          //this.donanteService.agregarDonantes(donant)
          this.productoInput =  '';
          this.cantidadInput = 0;
          this.unidadmedidaInput =0;
          this.FecCaduInput  = new Date();
          Swal.fire({
            icon:'info',
            title:'Inserción de productos ',
            text: 'Se ha insertado correctamente  ',
            showCloseButton: true,          
       }  )
       

       console.log('detalle donacion: ', this.detalleDonacion_Lst);
  }
    }//Fin agregar cliente


    eliminarDetalle(index: number) {
      this.detalleDonacion_Lst.splice(index, 1); // Elimina el detalle de la lista
    }
    
    
  
    //llamamos a lsitar donnates para luego filtrar por mail
    listarDonantes(){
      this.donanteService.obtenerDonantes()      
      .subscribe((data:any)=>{
          console.log(data);
          //this.donante_Lst = data;


          this.donante_Lst = data.filter((dony: any)  => dony.email === sessionStorage.getItem('mail') );
          this.donanteIdInput = this.donante_Lst[0].donante_id;
          this.donanteNombreInput = this.donante_Lst[0].nombre;
          this.documentoDonanteI = this.donante_Lst[0].nro_documento;
          this.datosDonante = "Id: " + this.donanteIdInput + "  |  " + " Nombre: " + this.donanteNombreInput + '  |  '  + ' Documento: ' + this.documentoDonanteI
          console.log('id: ' , this.donanteIdInput)

          console.log('Lista de donantes filtrada:', this.donante_Lst);


      })




  }


    
    //Agregar Donacion cabecera


    agregarDonante(){
          console.log(' donante_id ', this.donanteIdInput)
          let donacion = new Donacion(0, this.tipoInput, this.cantidadInput, this.monedaInput, this.bancoOrigen, this.fechaEntregaInput, this.estadoInput, this.comprobante ,this.donanteIdInput)
          //this.donanteLst.push(donant);
         // console.log(donacion);
          this.donacionService.ObtenerIdDonante(donacion)
          .subscribe(
              (response) =>{
                  //console.log("Resultado de guardar donante");
                  //console.log('la donacion guardad es ',response);

                  let donacionIdInput = response.toString();

                  this.detalleDonacion_Lst.forEach((detalle: DetalleDonacion) => {
                    detalle.donacion_id = parseInt(donacionIdInput); // Asignar el ID de la donación
                });

                console.log('se guardo??: ', this.detalleDonacion_Lst)

                this.detalleDonacion_Lst.forEach(detalle =>{
                  this.donacionDetalleS.agregarDetalleDonacion(detalle).subscribe(
                    (response) => {
                      console.log("Detalle de donación insertado correctamente:", response);
                    },
                    (error) => {
                      console.log("Detalle de donación insertado correctamente:", response);
                    }
                  )
                })


           ;

                  Swal.fire({
                      position: "center",
                      icon: "success",
                      title: "Se agregó correctamente al cliente",
                      showConfirmButton: true,
                      showCloseButton: true,
                      showCancelButton: true,
                      timer: 5000 //en milisegundos
                  });
            
                  //this.FecCaduInput = new Date();
                  this.listarDonaciones();

                 // this.listarDonantes();
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
          
        
  }//Fin agregar donaciones


    guardarDetalleDonacion(){
      
    }
 


    
}


