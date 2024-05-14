import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Donante } from '../model/donante.model';
import { runInThisContext } from 'vm';

@Injectable()
export class DonanteService {
  constructor(private dataServide: DataService) { }

  obtenerDonantes(){
    return this.dataServide.cargarDonantes();
  }

  buscarDonantexId(codigo: number){
    return this.dataServide.filtraDonantesporId(codigo);
  }

  buscarPorEmail(email:string)
  {
    return this.dataServide.filtrarPorMail(email);
  }

  agregarDonantes(donante: Donante){
    return this.dataServide.guardarDonante(donante)
  }

  actualizarDonantes(donante: Donante){
    return this.dataServide.modificarDonante(donante)
  }

  deleteDonante(codigo: number){
    return this.dataServide.eliminarDonante(codigo)
  }




}
