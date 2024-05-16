import { Component, OnInit ,  ElementRef, Renderer2, Inject } from "@angular/core";
import { AppComponent } from '../../app.component';
import { DOCUMENT } from "@angular/common";
import { ValidardonacionesService } from "../../Service/validardonaciones.service";
import { DonaciondetalleService } from "../../Service/donaciondetalle.service";



@Component({
  selector: 'app-valida-donaciones',
  templateUrl: './valida-donaciones.component.html',
  styleUrl: './valida-donaciones.component.css'
})
export class ValidaDonacionesComponent implements OnInit{

  constructor(
    private miComponente:AppComponent,
    private renderer:Renderer2,
    @Inject (DOCUMENT) private document: Document,
    private validardonacionesService:ValidardonacionesService,
    private donacionDetalleS : DonaciondetalleService,


  ){
    this.listarDonacionesxAprobar();
  }

  lst_donacionesporvalidar: any[] = [];
  detallexId: any[] = [];



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

     ngAfterViewInit() {
        const button = this.document.getElementById('accordionSidebar');
        if (button) {
          this.renderer.setStyle(button, 'display', 'block');
        }

        this.miComponente.menuAnalista();
        
      } 

      listarDonacionesxAprobar(){
        this.validardonacionesService.paraValidarDonaciones()
        .subscribe((data:any)=>{
            console.log(data);
            this.lst_donacionesporvalidar = data;
        })
    }      



        mostrarIemDon(id:number){
          this.donacionDetalleS.muestraDetallexId(id)
          .subscribe((data:any)=>{
              //console.log(data);
              this.detallexId = data;
              console.log(this.detallexId)
          })
        }
          

}
