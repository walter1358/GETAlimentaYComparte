import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Donante } from '../model/donante.model';
import { text } from 'express';
import { strict } from 'assert';


//comentario
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }

  cargarDonantes(){
    return this.httpClient.get("http://localhost:8080/api/donantes")
  }

  filtraDonantesporId(codigo : number){
    let url:string
    url = 'http://localhost:8080/api/donantes/' + codigo;
    return this.httpClient.get(url)
  }

  filtrarPorMail(email:string){
    let url:string
    url = 'http://localhost:8080/api/donantes/email/' + email;
    return this.httpClient.get(url)

  }


  modificarDonante(donante:Donante){
      return this.httpClient.put(" http://localhost:8080/api/donantesupt",donante);
  }

  guardarDonante(donante: Donante){
    return this.httpClient.post("http://localhost:8080/api/donantes", donante)
  }

  eliminarDonante(codigo: number){
    let url: string;
    url = "http://localhost:8080/api/donantes/" + codigo;
    return this.httpClient.delete(url);

  }



}