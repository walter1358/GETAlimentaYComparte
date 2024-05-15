import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { DetalleDonacion } from '../model/detalleDonacion.model';


@Injectable()
export class DonaciondetalleService {

  constructor(private dataService: DataService) { }


  agregarDetalleDonacion(detalleDonacion: DetalleDonacion){
      return this.dataService.guardaDetalleDonacion(detalleDonacion);
  }
}
