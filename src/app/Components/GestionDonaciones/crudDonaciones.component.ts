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

    //Donantes
    donanteIdInput: number = 0;
    donanteMailInput : string  ='a' ;
    donanteNombreInput : string = 'a';
    datosDonante: string = 'a';
    documentoDonanteI : string = 'a';

    //Donaciones
    fechaEntregaInput: string = '2024/08/20';
    nrodocumento: string='12345678';
    productoInput: string = '';
    cantidadInput: number =10;
    unidadmedidaInput: number = 1;
    fechaCaducidadInput: string = '2024/06/15';

    constructor( private elRef: ElementRef, private renderer: Renderer2,
      private donacionService: DonacionService,
    private miComponente:AppComponent,
    private donanteService: DonanteService,
    @Inject (DOCUMENT) private _document: Document,
    private authService: AuthService
    ){
      this.listarDonantes();

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

    
    // Método para guardar una donación y su detalle
guardarDonacionYDetalle() {
  // Crear un objeto con los datos de la donación
  const   detallesDonacion= {
    donanteId: this.donanteIdInput,
    // Agrega otros campos de donación según corresponda
    fechaEntrega: this.fechaEntregaInput,
    nrodocumento: this.nrodocumento,
    producto: this.productoInput,
    cantidad: this.cantidadInput,
    // Agrega otros campos de detalle de donación según corresponda
    fechaCaducidad: this.fechaCaducidadInput
  };

  // Crear una lista de objetos que representen los detalles de la donación
  const donacion = [
    {
      tipo: 'Alimento',
      cantidad: 10,
      moneda: 'USD',
      bancoOrigen: 'Banco A',
      fechaEntrega: '2024-05-15',
      estado: 'Nuevo',
      comprobante: 'N/A'
      // Otros campos de detalle según corresponda
    }
    // Puedes agregar más detalles según sea necesario
  ];

  // Envía la donación y sus detalles al servicio para guardarla en el backend
  this.donacionService.guardarDonacionYDetalle(detallesDonacion,donacion).subscribe(
    (response) => {
      // La donación y sus detalles se han guardado exitosamente
      console.log('Donación y detalles guardados:', response);

      // Si necesitas hacer algo después de guardar la donación y sus detalles, hazlo aquí
    },
    (error) => {
      // Maneja cualquier error al guardar la donación y sus detalles
      console.error('Error al guardar donación y detalles:', error);
    }
  );
}




    agregarDetalle(){

      if(this.productoInput === '' || this.cantidadInput ===  0 || this.unidadmedidaInput === 0
          || this.fechaCaducidadInput === ''
       ){
          Swal.fire({
              icon:'warning',
              title:'Hay campos vacíos',
              text: 'Complete los campos solicitados',
              showCloseButton: true,
          })
       }
       else{
          let detalle_dona = new DetalleDonacion(this.donanteIdInput,this.productoInput,this.cantidadInput, this.unidadmedidaInput ,this.fechaCaducidadInput);
          this.detalleDonacion_Lst.push(detalle_dona)
          //this.donanteService.agregarDonantes(donant)
          this.productoInput =  '';
          this.cantidadInput = 0;
          this.unidadmedidaInput =0;
          this.fechaCaducidadInput  = '';
          Swal.fire({
            icon:'info',
            title:'Inserción de productos ',
            text: 'Se ha insertado correctamente  ',
            showCloseButton: true,

          
       }  )
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


    
    

    agregarDonacion(){


        //console.log(this.authService.usuarioLst);
        console.log('session en home' , sessionStorage.getItem('mail'));
    
   
    }

    
}


