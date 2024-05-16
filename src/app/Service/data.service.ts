import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Donante } from '../model/donante.model';
import { text } from 'express';
import { strict } from 'assert';
import { Donacion } from '../model/donacion.model';
import { DetalleDonacion } from '../model/detalleDonacion.model';


//comentario
@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }

  cargarDonantes(){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }

    return this.httpClient.get("http://localhost:8080/api/donantes")
  }

  cargarDonaciones(){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
    return this.httpClient.get("http://localhost:8080/api/donaciones")
  }


  dataDonacionesValidar(){
    return this.httpClient.get("http://localhost:8080/api/validadonaciones");
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
  }
  


  filtraDonantesporId(codigo : number){
    let url:string
    url = 'http://localhost:8080/api/donantes/' + codigo;
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }

    return this.httpClient.get(url,httpOptions)
  }

  muestraDetalleDonacionesxId(codigo: number)
  {
    let url:string
    url = 'http://localhost:8080/api/detalles/' + codigo;
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
    return this.httpClient.get(url,httpOptions)
  }
  
  muestraDonacionesXDonante(codigo: number)
  {

    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
  
    let url:string
    url = 'http://localhost:8080/api/donacionesdonante/' + codigo;

    return this.httpClient.get(url,httpOptions)
  }


  filtrarPorMail(email:string){
    let url:string
    url = 'http://localhost:8080/api/donantes/email/' + email;

    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }

    return this.httpClient.get(url,httpOptions)

  }



  modificarDonante(donante:Donante){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
      return this.httpClient.put(" http://localhost:8080/api/donantesupt",donante,httpOptions);
  }

  guardarDonante(donante: Donante){

    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
  
    return this.httpClient.post("http://localhost:8080/api/donantes", donante,httpOptions)
  }

  guardarDonacionOutId(donacion:Donacion){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
    return this.httpClient.post("http://localhost:8080/api/donacionesout", donacion,httpOptions)
  }

  guardaDetalleDonacion(detalleDonacion: DetalleDonacion){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
    return this.httpClient.post("http://localhost:8080/api/donaciondet", detalleDonacion,httpOptions)

  }


  eliminarDonante(codigo: number){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  }
    let url: string;
    url = "http://localhost:8080/api/donantes/" + codigo;
    return this.httpClient.delete(url,httpOptions);

  }

  //SP para actualizar el estado de la donacion//

  uptEstadoDonacion(donacionid: number, estado: number){
    const httpOptions = {
      headers: new HttpHeaders({
          'content-type':'application/json',
          'Authorization': 'Basic cGVwaXRvOjQ4ZDI3ZDg3LTEzNWMtMDkyOS04Yzg3LWRkODg5NjUyOTNkMg=='
      })
  } 

  let url;
  url = "http://localhost:8080/api/donantes/";

  return this.httpClient.put<any>(`${url}/actualizarEntidad?id=${donacionid}&nuevoValor=${estado}`, {}, httpOptions);



  }



}
