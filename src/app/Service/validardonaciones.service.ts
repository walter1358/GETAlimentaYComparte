import { Injectable } from '@angular/core';
import { DataService } from './data.service';


@Injectable()
export class ValidardonacionesService {

  constructor(private dataService: DataService) { }

  paraValidarDonaciones(){
    return this.dataService.dataDonacionesValidar();
  }

  actualizaestado(donacionid: number, estado: number){
    return this.dataService.uptEstadoDonacion(donacionid, estado)
  }
  
}
