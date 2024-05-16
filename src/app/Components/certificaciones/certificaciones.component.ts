import { Component, ElementRef, Inject, OnInit, Renderer2 } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Donacion } from '../../model/donacion.model';
import { Donante } from '../../model/donante.model';
import { DetalleDonacion } from '../../model/detalleDonacion.model';
import { DonacionService } from '../../Service/donacion.service';
import { AppComponent } from '../../app.component';
import { DonanteService } from '../../Service/donante.service';
import { DonaciondetalleService } from '../../Service/donaciondetalle.service';
import { DOCUMENT } from '@angular/common';
import { AuthService } from '../../Service/auth/auth.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MyModalUpdateComponent } from '../my-modal-update/my-modal-update.component';
//import logo_final from '../../../assets/img/logo_final.png';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.css']
})
export class CertificacionesComponent implements OnInit{
  
  donanteLst: Donante[] = [
    new  Donante(1,1,1,"45612144","Renzo Quelopana Pantigoso","Av. Brasil","946588155","correo@correo"),
    new  Donante(1,1,1,"45612144","Walter","Av. Brasil","946588155","correo@correo"),
    new  Donante(1,1,1,"45612144","Yeltsin","Av. Brasil","946588155","correo@correo"),
    new  Donante(1,1,1,"45612144","Victor","Av. Brasil","946588155","correo@correo")
      //Donante(donante_id: number, tipo_donante: number, tipo_documento: number, nro_documento: string, nombre: string, direccion: string, telefono: string,
  ];

  titulo: string = 'GENERACION DE CERTIFICADOS';

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
      @Inject (DOCUMENT) private document: Document,

  ){
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

  getDataForPDF(donante: Donante) {
    return [{
        Id: donante.donante_id,
        Tipo_Donador: donante.tipo_donante,
        Tipo_Documento: donante.tipo_documento,
        DNI_RUC: donante.nro_documento,
        Nombres: donante.nombre,
        Dirección: donante.direccion,
        Teléfono: donante.telefono,
        Email: donante.email
    }];
}

  


  // createPdf() {
    // const pdfDefinition: any = {
    //   content: [{
    //     text: 'Hola Mundo'
    //   }]
    // };

    getBase64Image(): string {
      const canvas = document.createElement('canvas');
      canvas.width = 200; // Ajusta el ancho del logo según sea necesario
      canvas.height = 200; // Ajusta la altura del logo según sea necesario
  
      const ctx = canvas.getContext('2d');
      
      const imgElement = new Image(); // Crear un nuevo elemento de imagen
      imgElement.onload = () => { // Cuando la imagen esté cargada, dibújala en el lienzo
        ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      };
     // imgElement.src = logo_final; // Utilizar la ruta de la imagen cargada directamente
      
      return canvas.toDataURL('image/png');
    }

    generateCertificate(donante: Donante) {
      const data = this.getDataForPDF(donante); // Pasa el donante como argumento
    
      const docDefinition = {
        content: [],
        pageOrientation: 'landscape', // Establecer orientación horizontal
        background: [
          {
            image: 'backgroundImage',
            width: 800 // Ancho de la imagen de fondo
          }
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 20]
          },
          subheader: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          donorName: {
            fontSize: 36,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          paragraph: {
            fontSize: 14,
            margin: [0, 0, 0, 10]
          },
          date: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          signature: {
            bold: true,
            alignment: 'center',
            margin: [0, 50, 0, 0]
          },
          presidentName: {
            bold: true,
            alignment: 'center'
          },
          logo: {
            width: 200,
            alignment: 'center'
          }
        }
      };
    
      // Agregar el logo al contenido del documento
      //docDefinition.content.push({ image: 'logo', style: 'logo' });
    
      // Iterar sobre cada donante y agregar su certificado al documento
      data.forEach((donante, index) => {
        const certificateContent = [
          { text: 'CERTIFICADO DE AGRADECIMIENTO', style: 'header' },
          { text: 'La Asociación "Alimenta y Comparte"', style: 'subheader' },
          { text: 'expresa su más sincero agradecimiento a:', style: 'paragraph' },
          { text: donante.Nombres, style: 'donorName' },
          { text: 'por su generosa contribución de alimentos/dinero.', style: 'paragraph' },
          { text: 'Esta contribución ha sido invaluable para apoyar nuestra misión de ayudar a las personas necesitadas.', style: 'paragraph' },
          { text: 'Fecha: ' + new Date().toLocaleDateString(), style: 'date' },
          { text: 'Firma:', style: 'signature' },
          { text: 'Nombre del Presidente de la Asociación "Alimenta y Comparte"', style: 'presidentName' }
        ];
    
        // Agregar el certificado al contenido del documento
        if (index !== 0) {
          docDefinition.content.push({ text: '\n\n' }); // Agregar espacio entre certificados
        }
        docDefinition.content.push(certificateContent);
      });
    
      pdfMake.createPdf(docDefinition).download();
    }
    
    
    
    
   
    
     
    }
    

  
  
  //}

