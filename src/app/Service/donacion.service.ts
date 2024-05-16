import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Donacion } from '../model/donacion.model';



@Injectable()
export class DonacionService {
  constructor(private dataService: DataService) { }

  ObtenerIdDonante(donacion:Donacion){
    return this.dataService.guardarDonacionOutId(donacion);
  }

  cargarDonaciones(){
    return this.dataService.cargarDonaciones();
  }

  mostrarDonaciones(codigo:number){
    return this.dataService.muestraDonacionesXDonante(codigo);
  }

}
