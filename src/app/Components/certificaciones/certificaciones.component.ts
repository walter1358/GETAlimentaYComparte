import { Component, OnInit ,  ElementRef, Renderer2 , Inject, Injectable, ElementRef, Inject, OnInit, Renderer2 } from "@angular/core";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { DOCUMENT } from "@angular/common";
import { AppComponent } from "../../app.component";



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
export class CertificacionesComponent {

  ngOnInit() {
  }

  ngAfterViewInit() {
    const button = this._document.getElementById('accordionSidebar');
    if (button) {
      this.renderer.setStyle(button, 'display', 'block');
    }

    this.miComponente.menuDonante();
  } 

/*
  createPdf() {
     const pdfDefinition: any = {
       content: [{
         text: 'Hola Mundo'
       }]
     }};
*/

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
        content: [
          {
            image: 'logo_final.png', // Ruta a tu imagen de logo
            width: 200,
            alignment: 'center',
            margin: [0, 20, 0, 20]
          },
          {
            text: 'CERTIFICADO DE AGRADECIMIENTO',
            style: 'header'
          },
          {
            text: 'La Asociación "Alimenta y Comparte" expresa su más sincero agradecimiento a:',
            style: 'subheader'
          },
          {
            text: 'Nombre del Donante',
            style: 'donorName'
          },
          {
            text: 'por su generosa contribución de alimentos/dinero.',
            style: 'contribution'
          },
          {
            text: 'Esta contribución ha sido invaluable para apoyar nuestra misión de ayudar a las personas necesitadas.',
            style: 'description'
          },
          {
            text: 'Fecha: 16 de mayo de 2024',
            style: 'date'
          },
          {
            text: 'Firma:',
            style: 'signature'
          },
          {
            text: 'Nombre del Presidente de la Asociación "Alimenta y Comparte"',
            style: 'presidentName'
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

