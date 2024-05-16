import { Component } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-certificaciones',
  templateUrl: './certificaciones.component.html',
  styleUrls: ['./certificaciones.component.css']
})
export class CertificacionesComponent {

  ngOnInit() {
  }

  // createPdf() {
    // const pdfDefinition: any = {
    //   content: [{
    //     text: 'Hola Mundo'
    //   }]
    // };

    generateCertificate() {
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
            fontSize: 22,
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
            fontSize: 16,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          contribution: {
            fontSize: 14,
            margin: [0, 0, 0, 20]
          },
          description: {
            fontSize: 14,
            margin: [0, 0, 0, 20]
          },
          date: {
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
          }
        },
        pageSize: 'A4',
        pageOrientation: 'landscape'
      };
    
   
    
      const pdf = pdfMake.createPdf(docDefinition);
      pdf.download();
    }
    
    
     
    }
    

  
  
  //}

