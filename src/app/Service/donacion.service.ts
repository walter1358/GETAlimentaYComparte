import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DonacionService {
  constructor(private http: HttpClient) { }

  guardarDonacion(donacion: any) {
    return this.http.post<any>('/api/donaciones', donacion);
  }

  guardarDetalleDonacion(detalle: any) {
    return this.http.post<any>('/api/donaciones-detalles', detalle);
  }

  guardarDonacionYDetalle(donacion: any, detalles: any[]) {
    return this.http.post<any>('/api/donaciones', { donacion, detalles });
  }
  
}
