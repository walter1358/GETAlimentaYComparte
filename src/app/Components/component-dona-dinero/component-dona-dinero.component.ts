import { doesNotThrow } from 'assert';
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
  selector: 'app-component-dona-dinero',
  templateUrl: './component-dona-dinero.component.html',
  styleUrl: './component-dona-dinero.component.css'
})
export class ComponentDonaDineroComponent {

  donacion_Lst: Donacion[] = [];       
  donante_Lst: Donante[] = [];
  detalleDonacion_Lst: DetalleDonacion[] = [];
  detallexId: any[] = [];

  titulo: string = 'GESTION DE DONACIONES DE DINERO';

  //Donante
  donanteMailInput : string  ='' ;
  donanteNombreInput : string = '';
  datosDonante: string = '';
  documentoDonanteI : string = '';
  nrodocumento: string='';

  //Donaciones
  donacionIdInput: number = 0;
  tipoInput = 1;
  cantidadInput: number = 0;//
  monedaInput: string = '';//
  bancoOrigen: string = '';//
  fechaEntregaInput: Date = new Date('');//no va
  estadoInput = 1;//
  comprobante =  'imagen.jpg';    //
  donanteIdInput: number = 0;


  //FecCaduInput: string = '';}
  FecCaduInput: Date = new Date(); 

  constructor(
    private elRef: ElementRef, 
    private renderer: Renderer2,
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



listarDonaciones(){
  console.log('el donantes es: ',this.donanteIdInput)
    //this.donacionService.cargarDonaciones()
    this.donacionService.mostrarDonaciones(this.donanteIdInput)
  .subscribe((data:any)=>{
      console.log(data);
      this.donacion_Lst = data;
      //this.donacion_Lst = data.filter((dony: any)  => dony.donante_id === this.donanteIdInput );
      console.log('donaciones de: ',this.donacion_Lst)
  })
}



eliminarDetalle(index: number) {
  this.detalleDonacion_Lst.splice(index, 1); // Elimina el detalle de la lista
}





mostrarIemDon(id:number){
this.donacionDetalleS.muestraDetallexId(id)
.subscribe((data:any)=>{
    //console.log(data);
    this.detallexId = data;
    console.log(this.detallexId)
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
              console.log('la donacion guardad es ',response);

              let donacionIdInput = response.toString();


              Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Se agregó correctamente su donación",
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
